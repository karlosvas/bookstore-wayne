"use strict";

import dotenv from 'dotenv'
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectionDB } from "./database/mongodb.js"
import { Book } from "./database/models/book.js"
dotenv.config();

connectionDB()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, 'src')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'src/html/index.html'));
});

app.get('/api/books', async function (req, res) {
    try {
        const arrayResponse = await Book.find();
        res.json(arrayResponse); // Envia la respuesta como JSON
    } catch (e) {
        console.log(`El error es ${e}`);
        res.status(500).json({ error: 'Error al obtener los datos.' });
    }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
});