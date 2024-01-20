'use sctrict'

import { Data } from "./main.js";
import { colectionBook } from "./search.js"

// Se obtiene la informacion del archivo JSON en el endpoint.
export const readJsonDB = async () => {
    try {
        // SI la respuesta no es correcta, se lanza un error.
        const response = await fetch("/book/api");
        if (!response.ok)
            throw new Error("Error al cargar el archivo JSON");

        // Se obtienen las colecciones de libros.
        const jsonData = await response.json();
        Data.collection = jsonData[0];

        // Se obtienen todos los libros.
        const values = Object.values(jsonData[0]);
        values.shift();
        values.forEach((element) => Data.allBooks.push(...element));

    } catch (error) {
        console.error("Error:", error);
    }
};

export const addJsonDB = (book) => {
    readJsonDB(book)
        .then(() => {

            const bookData = Data.allBooks.find((element) => {
                return element.id == book
            })

            // Le damos el valor a los elementos del DOM.
            if (bookData) {
                document.getElementById("title").textContent = bookData.title;
                document.getElementById("content").textContent = bookData.content;
                document.getElementById("imgPath").src = bookData.imagePath;
                document.getElementById("price").textContent = bookData.price;

                // Se guarda el libro actual.
                Data.book = book

                // Se obtiene la coleccion del libro, y la creamos en el DOM.
                let bookCollection = book.replace(/\d+/g, '')
                const divMain = document.querySelector(".div-rel-books")
                colectionBook(Data.collection[bookCollection], divMain)
            } else {
                console.error("No se encontró el libro solicitado.");
            }

        })
        .catch((error) => {
            console.error("Error:", error);
        });
};