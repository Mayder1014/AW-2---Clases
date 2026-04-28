import express from 'express'
import path from 'node:path'

const puerto = 3000

// Instanciar servidor
const app = express()

app.use(express.static(path.resolve('front'))) //Utilizar el modulo path


app.listen(puerto, ()=>{
    console.log(`http://localhost:${puerto}`)
})