"use strict";

import dotenv from 'dotenv'
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { connectionDB } from "./database/mongodb.js"
import { Book } from "./database/models/book.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const srcPath = join(__dirname, "src");

const app = express();
dotenv.config()
connectionDB()

app.set("view engine", 'ejs')
app.set("views", __dirname + '/views')
app.use(express.static(srcPath));

app.get('/', (req, res) => {
    res.render("index");
});

app.get('/book', (req, res) => {
    res.render("book");
});

app.get('/api/books', async function (req, res) {
    try {
        const arrayResponse = await Book.find();
        res.json(arrayResponse);
    } catch (e) {
        console.log(`El error es ${e}`);
        res.status(500).json({ error: 'Error al obtener los datos.' });
    }
});

app.use((req, res, next) => {
    res.render("404", {
        titulo: "404",
        descripcion: "ERROR"
    });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
});