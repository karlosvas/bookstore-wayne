import { MongoClient } from "mongodb";
async function insertImageToMongoDB() {
    const uri = 'mongodb://localhost:27017'; // Cambia esto a tu URI de MongoDB
    const client = new MongoClient(uri, { useNewUrlParser: true });

    try {
        await client.connect();
        const database = client.db('mi_basededatos');
        const collection = database.collection('mi_coleccion');

        // Lee el archivo de imagen y conviértelo en un buffer de datos binarios
        const imageBuffer = fs.readFileSync('imagen.jpg');

        // Inserta la imagen en MongoDB
        await collection.insertOne({ image: new Binary(imageBuffer) });
        console.log('Imagen insertada en MongoDB');

    } catch (error) {
        console.error('Error al insertar la imagen en MongoDB:', error);
    } finally {
        client.close();
    }
}

insertImageToMongoDB();




