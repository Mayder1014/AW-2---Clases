import express from 'express'
import productos from './productos.mjs'

const puerto = 3000

const app = express()

app.get('api/v1/productos', (req, res)=> {
    res.json(productos)
})

app.listen(puerto)



