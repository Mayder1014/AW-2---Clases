// Capa encargada de los datos
// Por ejemplo, consultas a una base de datos local o externa
import productos from '../../productos.mjs'

export function obtenerTodos(){
    // Si tomamos datos de archivos JSON aqui estaria el readFile

    return productos
}

export function obtenerUno(id){
    const idProducto = Number(id)

    const productosFiltrado = productos.datos.filter((producto)=>{
        return Number(producto.id) === idProducto
    })

    return productosFiltrado
}

export function borrarUno(id){
    const idProducto = Number(id)
    const cantProductos = Number(productos.datos.length)

    // Esto es "artificial"
    const productosFiltrado = productos.datos.filter((producto)=>{
        return Number(producto.id) !== idProducto
    })
    // Usar .forEach() idealmente, junto a .splice(indice, 1) 

    // Aqui se podria retornar un booleano
    if (cantProductos !== productosFiltrado.length){
        return productosFiltrado
    } else{
        return 0
    }

}