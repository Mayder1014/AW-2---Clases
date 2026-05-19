import {Router} from 'express' // Si solamente vamos a utilizar router, importar asi
// import express from 'express' // Sino, asi
import * as controlador from './controlador.productos.mjs'

//
const rutasProductos = new Router()

// Obtener todos los productos
rutasProductos.get('/api/v1/productos', controlador.obtenerTodos)

// Obtener solo un producto
rutasProductos.get('/api/v1/productos/:id', controlador.obtenerUno)

// Borrar un producto
rutasProductos.delete('/api/v1/productos/:id', controlador.borrarUno)

export default rutasProductos


