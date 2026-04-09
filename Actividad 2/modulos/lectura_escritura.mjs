// Gestion de archivos en node
import fsP from 'node:fs/promises';
// Gestion de nombres de ruta en los distintos OS
import path from 'node:path'

// Se formateen dejando solo el “id”, el “email” y el “name”, eliminando el resto
function formatearDatos(usuarios){
    try {
        const usuariosFormateados = usuarios.map((usuario)=> {
            const usuarioFormateado = [{"id": usuario.id, "email": usuario.email, "name": usuario.name}]
        
            return usuarioFormateado
        })

        return usuariosFormateados
    } catch (error) {
        console.log(error)
    }
}

async function escribirEnJSON(usuarios){
    const ruta = path.join('./usuarios.json')
    
    const datosAguardar = JSON.stringify(usuarios, null, 4)
        
    await fsP.writeFile(ruta, datosAguardar)
}

async function leerJSON(){
    const ruta = path.join('./usuarios.json')
    
    const contenido = await fsP.readFile(ruta, 'utf8')

    console.log(contenido)
}

export {formatearDatos, escribirEnJSON, leerJSON}