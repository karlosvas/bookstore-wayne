"use sctrict"

import { Data } from "./index.js";
import { colectionBook } from "./search.js"

export const readJSON = async () => {
    const response = await fetch("./JSON/books.js");

    if (!response.ok) {
        throw new Error("Error al cargar el archivo JSON");
    }

    const jsonData = await response.json();

    Data.collection = jsonData

    for (const key in jsonData) {
        if (jsonData.hasOwnProperty(key)) {
            Data.allBooks.push(...jsonData[key]);
        }
    }
};

export const readJsonDB = async () => {
    const response = await fetch("/api/books");

    if (!response.ok) {
        throw new Error("Error al cargar el archivo JSON");
    }

    const jsonData = await response.json();

    Data.collection = jsonData[0]

    for (let key in Data.collection) {
        if (key == "_id") {
            continue
        }
        Data.allBooks.push(...Data.collection[key])
    }
    console.log(Data.collection)
    console.log(Data.allBooks)
};

export const addJSON = (book) => {
    readJSON(book)
        .then(() => {
            const bookData = Data.allBooks.find((element) => {
                return element.id == book
            })

            if (bookData) {
                document.getElementById("title").textContent = bookData.title;
                document.getElementById("content").textContent = bookData.content;
                document.getElementById("imgPath").src = bookData.imagePath;
                document.getElementById("price").textContent = bookData.price;
                let newCollection = ""
                for (let char of book) {
                    if (!isNaN(parseInt(char))) {
                        break
                    }
                    newCollection += char
                }
                const divFotos = document.querySelector(".div-rel-books");
                colectionBook(Data.collection[newCollection], divFotos)
                Data.book = bookData
            } else {
                console.error("No se encontró el libro solicitado.");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
};

export const addJsonDB = (book) => {
    readJsonDB(book)
        .then(() => {
            const bookData = Data.allBooks.find((element) => {
                return element.id == book
            })

            if (bookData) {
                document.getElementById("title").textContent = bookData.title;
                document.getElementById("content").textContent = bookData.content;
                document.getElementById("imgPath").src = bookData.imagePath;
                document.getElementById("price").textContent = bookData.price;
                let newCollection = ""
                for (let char of book) {
                    if (!isNaN(parseInt(char))) {
                        break
                    }
                    newCollection += char
                }
                const divFotos = document.querySelector(".div-rel-books");
                colectionBook(Data.collection[newCollection], divFotos)
                Data.book = bookData
            } else {
                console.error("No se encontró el libro solicitado.");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
};