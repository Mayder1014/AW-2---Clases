import productos from "./productos.mjs"


export function obtenerProductos(req, res){
    res.json(productos)
}

export function obtenerProductoPorID(req, res){
    const id = Number(req.params.id)

    const productoFiltrado = productos.datos.filter(producto => (Number(producto.id) === id))

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

export function agregarProducto(req, res){
    // recibo los datos convertidos a JS
    const producto = req.body

    const ultimo_id = productos.ultimo_id + 1
    // genera la estructura para el producto a insertar
    const productoFinal = {
        id: ultimo_id,
        ...producto
    }
    
    //producto.id = productos.ultimo_id + 1

    productos.datos.push(productoFinal)

    productos.ultimo_id = ultimo_id

    res.status(201).json({mensaje: 'Se dio de alta el producto'})
}

export function modificarProducto(req, res){
    const id_producto = Number(req.params.id)

    const productoM = req.body

    productos.datos.map((producto)=>{
        //obtenemos el indice del producto
        if(Number(producto.id) === id_producto){
            const indice = productos.datos.indexOf(producto)

            productos.datos[indice] = {
                id: id_producto,
                ...productoM
            }
        }
    })
    res.json({mensaje: 'Se modificó correctamente el producto'})


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