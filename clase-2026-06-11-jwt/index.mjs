// Token de acceso TID AW2 p.366

import express from 'express';
import cookieParser from 'cookie-parser';
//import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';
import pool from './conexion.bd.mjs';

// Inyectar las variables de entorno al proceso.
// dotenv.config();

const PUERTO = process.env.PUERTO || 4000;

const app = express();

app.use(cookieParser(process.env.COOKIE_FIRMA))

// ambos middleware --> body --> objeto JS
app.use(express.json()); //--> formato JSON
app.use(express.urlencoded({extended:true})) //--> URLENCODED

function chequearAcceso(req, res, next){
    const token = req.signedCookies['token']

    jwt.verify(token, process.env.JWT_FIRMA, function(error, decoded){
        if(error){
            res.redirect('/login')
        }
        next()
    })
}

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
        jwt.sign({usuario: 'FacundoE'}, process.env.JWT_FIRMA, {expiresIn: '1h'}, (error, token)=>{
            if (error){
                return res.json({mensaje: 'Error de token'})
            }

            res.cookie('token', token, {
                secure: true,
                httpOnly: true,
                sameSite: 'lax',
                signed: true,
                maxAge: 1000 * 10
            })
        })

        return res.status(200).redirect('/admin')
    } 
})


app.post('/registrar', async (req, res) => {
    const { usuario, pass } = req.body;
    if (!usuario || !pass) {
        return res.sendStatus(400);
    }
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashingPass = bcrypt.hashSync(pass, salt);
        const resultado = await pool.query(
            'INSERT INTO usuarios (username, password_hash) VALUES ($1, $2)',
            [usuario, hashingPass]
        );
        if (resultado.rowCount > 0) {
            res.redirect('/login'); // Redirigimos al usuario a la página de login
        } else {
            res.sendStatus(500);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

// Servir ambos fronts
app.use('/admin', chequearAcceso, express.static('./fronts/front-admin'))
app.use('/login', express.static('./fronts/front-login'))

app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});
