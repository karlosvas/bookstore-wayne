"use strict";

export let Data = {
  collection: "",
  allBooks: [],
  book: "",
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
      Data.allBooks.push(...jsonData[key]);
    }
  }
  Data.collection = Object.keys(jsonData)

  const foundBook = Data.allBooks.find((book) => book.id === res);
  if (foundBook) {
    Data.book = foundBook;
  }
};

document.addEventListener("DOMContentLoaded", function () {
  readJSON()
});

export function searchMatches(res) {
  let title = ""
  for (let book of res) {
    if (Data.collection.includes(book)) {
      title = book
    }
    if (!isNaN(book)) {
      title += book
    }
  }
  const findBook = Data.allBooks.find((libro) => libro.id === title);
  const firstFindBook = Data.allBooks.find((libro) => libro.id === title + "1");
  if (findBook) {
    Data.book = findBook
  } else if (firstFindBook) {
    title += "1"
    Data.book = firstFindBook
  } else { return }
  createBook(title)
}

const createBook = (title) => {
  const divFotos = document.querySelector(".div-fotos");
  const anchor = document.createElement("a");
  anchor.href = "/html/books.html";
  const img = document.createElement("img");
  img.src = Data.book.imagePath;
  img.className = "img-main";
  img.addEventListener("click", () => {
    document.cookie = `id=${title}; path=/;`;
  });
  anchor.appendChild(img);
  divFotos.appendChild(anchor);
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