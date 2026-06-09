import express, { urlencoded } from 'express';
import bcrypt from 'bcryptjs'
import pool from './conexion.bd.mjs'

const PUERTO = 3000

const app = express();

app.use(express.json()) // --> req.body --> objeto JS
app.use(express.urlencoded({extended:true})) // --> req.body --> objeto JS

// Hacer publicos los front para acceder desde el navegador

// admin
app.use('/admin', express.static('./fronts/front-admin'))

// login
app.use('/login', express.static('./fronts/front-login'))


// Configuracion de rutas login y registro
app.post('/autenticar', (req, res)=>{

})

app.post('/registrar', async (req, res)=>{
    // 1- Obtener datos del formulario
    /* const usuario = req.body.usuario
    const pass = req.body.pass */
    const {usuario, pass} = req.body // --> Asignación desestructurada

    // 2- Controlar datos
    if(!usuario || !pass){
        return res.status(404).json({
            mensaje: "Datos incompletos"
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


app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});
