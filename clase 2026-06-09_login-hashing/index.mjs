import express, { urlencoded } from 'express';
import bcrypt from 'bcryptjs'
import pool from './conexion.bd.mjs'
import cookieParser from 'cookie-parser'

const PUERTO = 3000

const app = express();

//-----------------------------------------------------------------------------------------------------------------
// Firmar cookie
app.use(cookieParser('miCookie'))


//-----------------------------------------------------------------------------------------------------------------
// Configuración de middlewares
app.use(express.json()) // --> req.body --> objeto JS
app.use(express.urlencoded({extended:true})) // --> req.body --> objeto JS

// Middleware para chequear el acceso (Redirige a login)
function chequearAcceso(req, res, next){
    const miIdentificador = (req.signedCookies['sesion'])

    if(miIdentificador === 'identificador'){
        return next()
    }

    res.redirect('/login')
}


//-----------------------------------------------------------------------------------------------------------------
// Hacer publicos los front para acceder desde el navegador

// admin
app.use('/admin', chequearAcceso, express.static('./fronts/front-admin'))

// login
app.use('/login', express.static('./fronts/front-login'))


//-----------------------------------------------------------------------------------------------------------------
// Configuración de verbos

// Configuración ruta de autenticación
app.post('/autenticar', async (req, res)=>{
    // 1- Obtener datos del formulario
    const {usuario, pass} = req.body

    // 2- Controlar datos incompletos (por las dudas, porque el formulario en realidad ya lo controla con un "required")
    if(!usuario || !pass){
        return res.status(404).json({
            mensaje: "Datos incompletos."
        })
    }

    // 3- Verificar si el usuario existe en la BBDD
    const resultado = await pool.query(`
        SELECT 
            *
        FROM 
            usuarios
        WHERE
            username = $1
        `, [usuario])

    console.log(resultado.rows)

    if (resultado.rowCount === 0){
        return res.status(404).json({
            mensaje: "Usuario no encontrado."
        })
    }

    // 4- Verificar que la contraseña ingresada coincida con el hash guardado en la BBDD
    const hash = resultado.rows[0].password_hash // --> Obtenemos el hash del usuario encontrado

    const validacion = await bcrypt.compare(pass, hash); // --> Devuelve true o false

    // 5- Si el booleano es false, mostrar mensaje de error, sino, generar cookie y redigir a admin
    if (!validacion){
        return res.status(404).json({
            mensaje: "Contraseña incorrecta."
        })
    }
    else{
        res.cookie('sesion','identificador', {
            secure: true, // <-- https
            httpOnly: true, // <-- NO se puede leer desde JS
            sameSite: 'lax', // <-- Como se va a leer la cookie con respecto al dominio
            signed: true, // <-- Si la cookie se va a firmar o no
            maxAge: 1000 * 10 // <-- Milisegundos
        })

        return res.status(200).redirect('/admin')
    } 
})

// Configuración ruta de registro
app.post('/registrar', async (req, res)=>{
    // 1- Obtener datos del formulario
    /* const usuario = req.body.usuario
    const pass = req.body.pass */
    const {usuario, pass} = req.body // --> Asignación desestructurada

    // 2- Controlar datos
    if(!usuario || !pass){
        return res.status(404).json({
            mensaje: "Datos incompletos."
        })
    }

    // 3- Hashear claves
    const salt = await bcrypt.genSalt(10); // --> (10 son cant de vueltas)
    const hash = await bcrypt.hash(pass, salt);
    
    const resultado = await pool.query(`
        INSERT INTO usuarios
            (username, password_hash)
        VALUES 
            ($1, $2)
        RETURNING 
            id, username
        `, [
            usuario,
            hash
        ]
    )

    if(resultado.rowCount > 0){
        return res.status(201).json({
            mensaje: "Usuario registrado",
            usuario: resultado.rows[0].username
        })
    }

    res.status(500).json({mensaje: "No se pudo realizar el registro"})
})


//-----------------------------------------------------------------------------------------------------------------
// Levantar el servidor
app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});
