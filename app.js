"use strict";

import dotenv from 'dotenv'
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, 'src')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'src/html/index.html'));
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
});