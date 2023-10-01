"use strict";
import { Data } from './index.js';

export function searchMatches(res) {
  // Verifica si corresponde con algun título.
  for (let i = 0; i < Data.allBooks.length; i++) {
    let element = Data.allBooks[i].title
    element.replace(/\s+/g, '').toLocaleLowerCase()
    if (element == res) {
      const book = Data.allBooks[i]
      createBook(book)
    }
  }
  res = res.replace(/\s+/g, '').toLocaleLowerCase()
  // Verifica si corresponde a una colección.
  if (Data.collection[res] !== undefined) {
    let collection = Data.collection[res]
    const divFotos = document.querySelector(".div-fotos");
    colectionBook(collection, divFotos)
  }
  // Verifica si coresponde con alguna id.
  for (let i = 0; i < Data.allBooks.length; i++) {
    if (Data.allBooks[i].id == res) {
      const book = Data.allBooks[i]
      createBook(book)
    }
  }

  return
}

const createBook = (book) => {
  const divFotos = document.querySelector(".div-fotos");
  const anchor = document.createElement("a");
  anchor.href = "/html/books.html";
  const img = document.createElement("img");
  img.src = book.imagePath;
  img.className = "img-main";
  img.addEventListener("click", () => {
    Data.book = book
    document.cookie = `id=${book.id}; path=/;`;
  });
  anchor.appendChild(img);
  divFotos.appendChild(anchor);
};


export const colectionBook = (collection, divFotos) => {
  let arrCollectoion = []
  for (let value of collection) {
    arrCollectoion.push(value)
  }
  for (let i = 0; i < arrCollectoion.length; i++) {
    const anchor = document.createElement("a");
    anchor.href = "/html/books.html";
    const img = document.createElement("img");
    img.src = arrCollectoion[i].imagePath;
    img.className = "img-main";
    img.addEventListener("click", () => {
      document.cookie = `id=${arrCollectoion[i].id}; path=/;`;
    });
    anchor.appendChild(img);
    divFotos.appendChild(anchor);
  }
};

export const findPrice = (title, arr) => {
  Object.values(Data.allBooks).forEach(function (elemento) {
    if (title === elemento.title) {
      arr.push(elemento.price);
    }
  });
};

export const findBook = (title, arr) => {
  Object.values(Data.allBooks).forEach(function (elemento) {
    if (title === elemento.title) {
      arr.push(elemento.book);
    }
  });
};