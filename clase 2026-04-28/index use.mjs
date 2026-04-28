import express from 'express'

const puerto = 3000

// Instanciar servidor
const app = express()

function middleware1(req, res, next){
    console.log('middleware1')
    next()
}

app.use('/saludo', middleware1) // -> use toma la ruta como prefijo. 



app.get('/', middleware1, (req, res)=>{
    console.log('Respuesta final')
    res.send('Hola')
})

app.get('/saludo', middleware1, (req, res)=>{
    console.log('Respuesta final con saludo')
    res.send('Hola')
})

app.get('/saludodedia', middleware1, (req, res)=>{
    console.log('Respuesta final con saludo')
    res.send('Hola')
})



app.listen(puerto, ()=>{
    console.log(`http://localhost:${puerto}`)
})