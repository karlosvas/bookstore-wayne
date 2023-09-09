"use strict";

export let books = 0;
export let data = {
  allBooks: "",
  mistbornData: "",
  archivoData: "",
  book: "",
};

export function searchMatches(res) {
  if (res.includes("mistborn")) {
    let titulo = "mistborn" + findNumber(res, 6);
    books++;
    if (titulo != "mistbornundefined" && titulo !== "mistborn") {
      createBook(titulo);
    }
  }

  if (res.includes("archivo") || res.includes("tormentas")) {
    let titulo = "archivo" + findNumber(res, 4);
    books++;
    if ((titulo != "archivoundefined") | (titulo == "archivo")) {
      createBook(titulo);
    }
  }
}

export const readJSON = async (res) => {
  const response = await fetch("/JSON/books.json");
  if (!response.ok) {
    throw new Error("Error al cargar el archivo JSON");
  }
  const jsonData = await response.json();
  const bookArray = [...jsonData.mistborn, ...jsonData.archivo];
  data.allBooks = bookArray;
  data.mistbornData = jsonData.mistborn;
  data.archivoData = jsonData.archivo;

  const foundBook = bookArray.find((book) => book.id === res);
  if (foundBook) {
    data.book = foundBook;
  }
};

const findNumber = (res, maxLength) => {
  res = res.split(" ");
  let num = 1;
  for (let actualNum of res) {
    if (actualNum <= maxLength) {
      num = actualNum;
      return num;
    } else if (actualNum > maxLength) return undefined;
  }
  return num;
};

const createBook = (titulo) => {
  const divFotos = document.querySelector(".div-fotos");
  const anchor = document.createElement("a");
  anchor.href = "/html/books.html";
  const img = document.createElement("img");
  img.src = `/img/${titulo}.png`;
  img.addEventListener("click", () => {
    document.cookie = `id=${titulo}; path=/;`;
  });
  anchor.appendChild(img);
  divFotos.appendChild(anchor);
};
