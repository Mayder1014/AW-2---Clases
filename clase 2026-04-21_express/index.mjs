// ExpressJS -> framework de JS para crear servidores
import express from 'express'

//mi ip = 192.169.0.122

const puerto = 3014

// Instancia de servidor
const app = express()

// Verbo y ruta configurada -> GET
app.get('/', (req, res)=>{
    res.status(200)
    res.set('content-type', 'text/html')
    res.send('<h1>Hola ExpressJS en /<h1>')
})

// Verbo y ruta configurada -> GET /saludo
app.get('/saludo', (req, res)=>{

    res.status(200)
    res.send('Привет')
})

// Verbo y ruta configurada -> POST 
app.post('/', (req, res)=>{
    res.status(201)
    res.send('Hola POST en /')
})

// Verbo y ruta configurada -> POST /saludo
app.post('/saludo', (req, res)=>{
    res.status(201)
    res.send('Привет')
})

// Abro puerto para escuchar peticiones
app.listen(puerto, () =>{
    console.log(`Servidor corriendo en http://localhost:${puerto}`)
})