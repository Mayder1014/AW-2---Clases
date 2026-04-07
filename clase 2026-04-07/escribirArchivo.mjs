// Gestion de archivos en node
import fsP from 'node:fs/promises';
// Gestion de nombres de ruta en los distintos OS
import path from 'node:path'

try {
    const ruta = path.join('./texto.txt')
    // Escribimos archivo
    await fsP.writeFile(ruta, 'Nuevo Contenido')
} 
catch (error) {
    console.log(error)
}
