// Gestion de archivos en node
import fsP from 'node:fs/promises';
// Gestion de nombres de ruta en los distintos OS
import path from 'node:path'

try {
    // Leemos la API via fetch() y devuelve un objeto Response
    const respuesta = await fetch('https://69cbcd4a0b417a19e07b4895.mockapi.io/api/v1/Productos')
    // Extraer el cuerpo en formato JSON y convertirlo a un Arreglo/Objeto
    const productos = await respuesta.json()

    const ruta = path.join('./datosApi.json')

    // Convertir objeto JS a arreglo u objeto JSON
    const datos = JSON.stringify(productos, null, 4)

    // Escribimos archivo
    await fsP.writeFile(ruta, datos)
}
catch (error) {
    console.log(error)
}

