import express from 'express'
import {agregarProducto, eliminarProducto, modificarProducto, obtenerProductoPorID, obtenerProductos} from './funciones.mjs'

const puerto = 3000


const app = express()

app.use(express.json()) // Avisa a express que parsee los datos en JSON  



// Definiendo una API REST

// GET /api/v1/productos --> Todos
app.get('/api/v1/productos', obtenerProductos)

// GET /api/v1/productos/:id --> 1 (por ID)
app.get('/api/v1/productos/:id', obtenerProductoPorID)

// POST /api/v1/productos --> Dar de alta un nuevo producto
app.post('/api/v1/productos', agregarProducto)

// PUT /api/v1/productos/:id --> Modificar un producto
app.put('/api/v1/productos/:id', modificarProducto)

// DELETE /api/v1/productos/:id --> Eliminar un producto
app.delete('/api/v1/productos/:id', eliminarProducto)



app.listen(puerto)