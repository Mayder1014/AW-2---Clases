// ExpressJS -> framework de JS para crear servidores
import express from 'express'

const puerto = 3000

// Instanciar servidor
const app = express()

function middleware1(req, res, next){
    const usuarioExiste = false
    
    // if(usuarioExiste){
    //     console.log('Usuario existe, puede pasar')
    //     next()
    // }else{
    //     console.log('Usuario no existe, NO puede pasar')
    //     res.send('Usuario no existe')
    // }

    if (usuarioExiste){
        return next()
    }
    console.log('Usuario no existe, NO puede pasar')
    return res.send('Usuario no registrado')
}


// app.get('/', middleware1, (req, res)=>{
//     console.log('Respuesta final')
//     res.send('Hola')
// })

app.listen(puerto, ()=>{
    console.log(`http://localhost:${puerto}`)
})