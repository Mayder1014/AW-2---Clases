// ExpressJS -> framework de JS para crear servidores
import express from 'express'

const puerto = 3000

// Instanciar servidor
const app = express()

// Avisamos a Express -> Chequear datos del cliente -> cuerpo (configuracion)
//app.use(express.urlencoded({extended:true}))
app.use(express.json())

const productos = [
        {
            id: 1,
            nombre: 'camiseta',
            precio: 3000
        },
        {
            id: 2,
            nombre: 'pantalon',
            precio: 4000
        }
]


//req -> Datos del navegador / res -> Para dar una respuesta al cliente
app.get('/', (req, res)=>{
    res.status(200)
    res.end('Estas en /')
})

app.get('/productos', (req, res)=>{
    // res.sendStatus(200)


    res.json(productos) // Agregar una cabecera y convierte javascript a JSON
    // res.set('content-type', 'application/json') // Cabecera
    // res.send('{"materia": "AW2"}')
})

app.get('/productos/:id', (req, res)=>{ // ruta (/) comodin (:)
    const id = parseInt(req.params.id) // Esto traera una cadena, por eso lo convertimos a entero

    // Filtar ------------------------------------------------
    //const productoFiltrado = productos.filter(producto => producto.id == id) // return implicito

    const productoFiltrado = productos.filter((producto)=>{
        return (producto.id === id)
    })

    if (productoFiltrado.length > 0){
        res.json(productoFiltrado) // Agregar una cabecera y convierte javascript a JSON
    } 

    res.json({"mensaje": "Producto no encontrado"})
})

// Envio datos al servidor
app.post('/productos', (req, res) =>{
    //Verificamos el cuerpo del mensaje
    const datosCliente = req.body

    productos.push(datosCliente)

    res.status(201).json({mensaje: "Producto dado de alta"})
})



app.listen(puerto, () =>{
    console.log(`Servidor corriendo en http://localhost:${puerto}`)
})