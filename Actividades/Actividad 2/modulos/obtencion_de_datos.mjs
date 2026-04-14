// Obtenga los datos que vienen en formato JSON
async function obtencionDeDatos() {
    try {
        // Leemos la API via fetch() y devuelve un objeto Response
        const respuesta = await fetch('https://api.escuelajs.co/api/v1/users')

        const usuarios = await respuesta.json()

        return usuarios
    }
    catch (error) {
        console.log(error)
    }
}

export default obtencionDeDatos