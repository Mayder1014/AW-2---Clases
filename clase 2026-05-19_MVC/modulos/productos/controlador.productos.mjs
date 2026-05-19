import * as modelo from './modelo.productos.mjs'
import * as vista from './vistas.productos.mjs'

export function obtenerTodos(req, res){
    // Obtenemos de capa modelo la funcion
    const productos = modelo.obtenerTodos()

    //En la vista modelamos la respuesta
    const respuesta = vista.obtenerTodos(productos)

    res.json(respuesta)
}







export function obtenerUno (req, res){
    // obtener id del parametro
    const id = req.params.id
    // ejecutamos la funcion importada desde modelo
    const producto = modelo.obtenerUno(id)

    // verificamos si hay producto
    if (producto.length > 0){
        res.json(producto)
    } else{
        res.status(404).json({mensaje: 'producto no encontrado'})
    }
}

export function borrarUno (req, res){
    // obtener id del parametro
    const id = req.params.id
    // ejecutamos la funcion importada desde modelo
    const producto = modelo.borrarUno(id)

    // verificamos si hay producto
    if (producto.length > 0){
        res.json(producto)
    } else{
        res.status(500).json({mensaje: 'producto no encontrado'})
    }
}