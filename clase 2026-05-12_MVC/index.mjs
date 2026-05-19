import express from 'express'
import * as controlador from './modulos/productos/controlador.productos.mjs'

const puerto = 3000

const app = express()

// Obtener todos los productos
app.get('/api/v1/productos', controlador.obtenerTodos)

// Obtener solo un producto
app.get('/api/v1/productos/:id', controlador.obtenerUno)

// Borrar un producto
app.delete('/api/v1/productos/:id', controlador.borrarUno)

app.listen(puerto)
