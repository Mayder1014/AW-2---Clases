// Modulo HTTP
import http from 'node:http'
import fsp from 'node:fs/promises'
import path from 'node:path'

// Creamos Instancia de servidor
const app = http.createServer(async (peticion, respuesta)=> {
    //console.log(peticion) // viene del cliente

    if (peticion.method === 'GET'){
        //console.log(peticion.method)
        if (peticion.url === '/'){
            respuesta.statusCode = 200
            // Antes del .end TODO tiene que estar config, despues nada
            return respuesta.end(`
                ruta raiz
            `)
        }
        if (peticion.url === '/usuarios'){
            respuesta.statusCode = 200
            // Antes del .end TODO tiene que estar config, despues nada
            return respuesta.end(`
                ruta usuarios
            `)
        }
    }

    if (peticion.method === 'POST'){
        if(peticion.url === '/'){
            const ruta = './contenido.txt'

            await fsp.writeFile(ruta, 'Contenido fake')

            return respuesta.end('Recurso creado')
        }
    }

    // Fallback
    respuesta.statusCode = 404
    return respuesta.end('No se encontro la ruta')
})

// Abrimos puerto (usar de 3000 para arriba)
app.listen(3000, ()=> {
    console.log(`Servidor escuchando en http://localhost:3000`)
})



