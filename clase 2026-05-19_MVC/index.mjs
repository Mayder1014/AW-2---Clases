import express from 'express'
import rutasProductos from './modulos/productos/rutas.productos.mjs'

const puerto = 3000

const app = express()

app.use(rutasProductos) //Le avisamos a express que utilice este enrutamiento

app.listen(puerto)
