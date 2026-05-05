import express from 'express'
import {eliminarProducto, obtenerProductoPorID, obtenerProductos} from './funciones.mjs'

const puerto = 3000


const app = express()

// Definiendo una API REST

// GET /api/v1/productos --> Todos
app.get('/api/v1/productos', obtenerProductos)

// GET /api/v1/productos/:id --> 1 (por ID)
app.get('/api/v1/productos/:id', obtenerProductoPorID)


// POST /api/v1/productos --> Dar de alta un nuevo producto


// PUT /api/v1/productos/:id --> Modificar un producto


// DELETE /api/v1/productos/:id --> Eliminar un producto
app.delete('/api/v1/productos/:id', eliminarProducto)



app.listen(puerto)