import productos from "./productos.mjs"


export function obtenerProductos(req, res){
    res.json(productos)
}

export function obtenerProductoPorID(req, res){
    const id = Number(req.params.id)

    const productoFiltrado = productos.filter(producto => (Number(producto.id) === id))

    if (productoFiltrado.length > 0){
        // Se pueden hacer respuestas personalizadas
        const respuesta = {
            datos: productoFiltrado,
            url: 'http://localhost:3000/api/v1/productos/' + id,
            status: 200
        }

        res.json(respuesta)
    } else{
        res.status(404).json({mensaje: 'Producto no encontrado.'})
    }
}

export function eliminarProducto(req, res){
    const id = Number(req.params.id)

    const productosFiltrado = productos.filter(producto => (Number(producto.id) !== id))

    const respuesta = {
        datos: productosFiltrado,
        mensaje: 'producto eliminado',
        url: 'http://localhost:3000/api/v1/productos/' + id,
        status: 200,
        verbo: 'DELETE'
    }

    res.json(respuesta)
    
}