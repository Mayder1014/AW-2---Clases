import obtenerDatos from './modulos/obtencion_de_datos.mjs'
import {formatearDatos, escribirEnJSON, leerJSON} from './modulos/lectura_escritura.mjs'

const usuarios = await obtenerDatos()

const usuariosFormateados = formatearDatos(usuarios)

await escribirEnJSON(usuariosFormateados)
await leerJSON()



//---------------------------------------------------------------------------------
// (Todo hecho en index)

// // Gestion de archivos en node
// import fsP from 'node:fs/promises';
// // Gestion de nombres de ruta en los distintos OS
// import path from 'node:path'

// try {
//     // Leemos la API via fetch() y devuelve un objeto Response
//     const respuesta = await fetch('https://api.escuelajs.co/api/v1/users')
//     // Extraer el cuerpo en formato JSON y convertirlo a un Arreglo/Objeto
//     const usuarios = await respuesta.json()
    
//     const usuariosFormateados = usuarios.map((usuario)=> {
//         const usuarioFormateado = [{"id": usuario.id, "email": usuario.email, "name": usuario.name}]

//         return usuarioFormateado
//     })

//     const ruta = path.join('./usuarios.json')

//     const datosAguardar = JSON.stringify(usuariosFormateados, null, 4)
    
//     await fsP.writeFile(ruta, datosAguardar)

//     const contenido = await fsP.readFile(ruta, 'utf8')
//     console.log(contenido)

// } catch (error) {
//     console.log(error)
// }

