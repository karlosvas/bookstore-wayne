"use strict";

export let data = {
  collection: "",
  allBooks: [],
  book: "",
  mistborn: "",
  archivo: "",
  searchBooks: 0,
};

export const readJSON = async (res) => {
  const response = await fetch("/JSON/books.json");
  if (!response.ok) {
    throw new Error("Error al cargar el archivo JSON");
  }
  const jsonData = await response.json();
  for (const key in jsonData) {
    if (jsonData.hasOwnProperty(key)) {
      data.allBooks.push(...jsonData[key]);
    }
  }
  // const bookArray = [...jsonData.mistborn, ...jsonData.archivo, ...jsonData.harry, ...jsonData.tatiana, ...jsonData.mariposas];
  data.collection = Object.keys(jsonData)

  const foundBook = data.allBooks.find((book) => book.id === res);
  if (foundBook) {
    data.book = foundBook;
  }
};

document.addEventListener("DOMContentLoaded", function () {
  readJSON()
});

export function searchMatches(res) {
  let title = ""
  for (let book of res) {
    if (data.collection.includes(book)) {
      title = book
    }
    if (!isNaN(book)) {
      title += book
    }
  }
  const findBook = data.allBooks.find((libro) => libro.id === title);
  const firstFindBook = data.allBooks.find((libro) => libro.id === title + "1");
  if (findBook) {
    data.book = findBook
  } else if (firstFindBook) {
    title += "1"
    data.book = firstFindBook
  } else { return }
  createBook(title)
}

const createBook = (title) => {
  const divFotos = document.querySelector(".div-fotos");
  const anchor = document.createElement("a");
  anchor.href = "/html/books.html";
  const img = document.createElement("img");
  img.src = data.book.imagePath;
  img.addEventListener("click", () => {
    document.cookie = `id=${title}; path=/;`;
  });
  anchor.appendChild(img);
  divFotos.appendChild(anchor);
};


// let Objeto = {
//   price: "34$"
// }

// let Array = []

export const findPrice = (title, arr) => {
  Object.values(data.allBooks).forEach(function (elemento) {
    if (title === elemento.title) {
      arr.push(elemento.price);
    }
  });
};

export const findBook = (title, arr) => {
  Object.values(data.allBooks).forEach(function (elemento) {
    if (title === elemento.title) {
      arr.push(elemento.book);
    }
  });
};

// Ejemplo de uso:
// findBook("Harrry Potter", Array, price)