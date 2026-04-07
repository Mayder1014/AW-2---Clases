// console.log("Todo bem")

// Gestion de archivos en node
import fsP from 'node:fs/promises';
// Gestion de nombres de ruta en los distintos OS
import path from 'node:path'

try {
    const ruta = path.join('./texto.txt')
    const contenido = await fsP.readFile(ruta, 'utf8')
    console.log(contenido)
}
catch (error) {
    console.log(error)
}

