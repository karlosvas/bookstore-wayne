'use strict'

import { Data } from './main.js';

// Verifica si corresponde con algun título.
export function searchMatches(res, divRel) {
  res = res.toLocaleLowerCase();

  for (let i = 0; i < Data.allBooks.length; i++) {

    let Book = Data.allBooks[i]

    // Verifica si corresponde con el título para crearlo.
    if (Book.title.toLocaleLowerCase() == res) {
      createBook(Book)
      return
    }

    const IdBook = Book.id.replace(/(\D)(\d)/g, '$1 $2').toLocaleLowerCase()
    if (IdBook == res || Book.id == res) {
      createBook(Book)
      return
    }
  }

  // Elimina los espacios y los convierte en minúsculas.
  res = res.replace(/\s+/g, '').toLocaleLowerCase()

  // Verifica si corresponde a una colección.
  if (Data.collection[res] !== undefined) {
    console.log(divRel)
    colectionBook(Data.collection[res], divRel)
  }
}

// Crea el div del libro y almacena la informacion necesaria.
const createBook = (Book) => {
  const divFotos = document.querySelector(".div-main");
  const anchor = document.createElement("a");
  const img = document.createElement("img");

  anchor.href = "/book";
  img.src = Book.imagePath;
  img.className = "img-main";
  img.addEventListener("click", () => {
    // Guarda el libro en el objeto Data, y en las cookies.
    Data.book = Book
    document.cookie = `id=${Book.id}; path=/;`;
  });
  anchor.appendChild(img);
  divFotos.appendChild(anchor);
};

// Crea el div del cada libro de la colección y almacena la informacion necesaria.
export const colectionBook = (collection, divRel) => {

  for (let i = 0; i < collection.length; i++) {
    const anchor = document.createElement("a");
    const img = document.createElement("img");

    anchor.href = "/book";
    img.src = collection[i].imagePath;
    img.className = "img-main";
    img.addEventListener("click", () => {
      // Guarda el libro en el que se hizo clic en el objeto Data, y en las cookies.
      document.cookie = `id=${collection[i].id}; path=/;`;
    });
    anchor.appendChild(img);
    divRel.appendChild(anchor);
  }

};