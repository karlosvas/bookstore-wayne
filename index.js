"use strict";

import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { connectionDB } from "./database/mongodb.js"
import { Book } from "./database/models/book.js"

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT;

app.use(express.static('public'))
app.use(cors());
app.use(express.static(join(__dirname, "public")));
app.use(express.json());

app.set("views", join(__dirname, 'views'));
app.set("view engine", "ejs");

app.disable('x-powered-by');

// Conexion a la base de datos.
connectionDB();

// Ruta principal.
app.get('/', (req, res) => {
    res.render("index");
});

// Ruta de los libros.
app.get('/book', (req, res) => {
    res.render("book");
});

// Envia toda la info a un nuevo endpoint.
app.get('/book/api', async function (req, res) {
    try {
        const allCollection = await Book.find();
        res.json(allCollection);
    } catch (e) {
        console.log(`El error es ${e}`);
        res.status(500).json({ error: 'Error al obtener los datos.' });
    }
});

app.use((req, res, next) => {
    res.status(400).render("404", {
        titulo: "404",
        descripcion: "ERROR"
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
});