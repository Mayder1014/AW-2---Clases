import http from 'node:http'
import fsp from 'node:fs/promises';
import path from 'node:path'

const app = http.createServer(async (petition, response)=>{
    try {
        if (petition.method === "GET"){
            if (petition.url === '/usuarios'){
                // Obtener datos
                const respuesta = await fetch("https://api.escuelajs.co/api/v1/users")
    
                const usuarios = await respuesta.json()
                    
                const ruta = path.join('./usuarios.json')
    
                const datos = JSON.stringify(usuarios, null, 4)
                
                // Guardar/Escribir
                await fsp.writeFile(ruta, datos)
                
                // Leer
                const leer = await fsp.readFile(ruta, 'utf-8')

                // Mostrar respuesta al cliente
                return response.end(leer)
            }

            if (petition.url === "/usuarios/filtrados"){
                // Obtener Datos
                const respuesta = await fetch("https://api.escuelajs.co/api/v1/users")
    
                const usuarios = await respuesta.json()
                
                // Filtrar ID menor a 10
                const usuariosFiltrados = usuarios.filter(usuario => usuario.id < 10)

                const ruta = path.join('./usuariosFiltrados.json')

                const datos = JSON.stringify(usuariosFiltrados, null, 4)

                // Guardar/Escribir
                await fsp.writeFile(ruta, datos)
                
                // Leer
                const leer = await fsp.readFile(ruta, 'utf-8')

                return response.end(leer)
            }
        }
    } catch (error) {
        console.log(error)
    }

    response.statusCode = 404
    return response.end(`
        Recurso no encontrado
    `) 
})

// Abrimos puerto (usar de 3000 para arriba)
app.listen(3000, ()=> {
    console.log(`Servidor escuchando en http://localhost:3000`)
})