import express from 'express'
import cookieParser from 'cookie-parser'

const PUERTO = 3000

const app = express()

app.use(cookieParser('misecreto'))

// Avisamos que debe incluir los datos en body
app.use(express.json())

// Middleware para chequear el acceso (Redirige a login)
function chequearAcceso(req, res, next){
    const miIdentificador = (req.signedCookies['sesion'])

    if(miIdentificador === 'identificador'){
        return next()
    }

    res.redirect('/login')
}

// Codificacion de URL
app.use(express.urlencoded({extended:true}))

// Front Login
app.use('/login', express.static('./fronts/front-login'))

// Front Admin
app.use('/admin', chequearAcceso, express.static('./fronts/front-admin'))

// Ruta de autenticación
app.post('/autenticar', (req, res)=>{
    // Verificar las credenciales
    const {usuario, clave} = req.body

    // Esto debe ser una consulta a BBDD
    if (usuario != 'Mayder1014' || clave != '1014'){
        return res.redirect('/login')
    }

    console.log(req.body)
    // Generar cabeceras para gestion de cookies
    // Gestionamos cookies
    res.cookie('sesion','identificador', {
        secure: true, // <-- https
        httpOnly: true, // <-- NO se puede leer desde JS
        sameSite: 'lax', // <-- Como se va a leer la cookie con respecto al dominio
        signed: true, // <-- Si la cookie se va a firmar o no
        maxAge: 1000 * 10 // <-- Milisegundos
    })

    // res.json({
    //     mensaje: 'Usuario logueado.'
    // })

    // Lo vamos a utilizar solo si en el front es HTML puro
    res.redirect('/admin')
    // Si no es puro, utilizar JS para gestionar el formulario
})



app.listen(PUERTO)