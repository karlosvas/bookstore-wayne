"use strict";

export let books = 0;

export function searchMatches(res) {
  if (res.includes("mistborn")) {
    let titulo = findNumber(res, "mistborn", 6);
    books++;
    document.cookie = `id=${titulo}`;
  }
  if (res.includes("archivo") || res.includes("tormentas")) {
    let titulo = findNumber(res, "archivo", 4);
    books++;
    document.cookie = `id=${titulo}`;
  }
}

export const readJSON = async (res) => {
  const response = await fetch("/JSON/books.json");
  if (!response.ok) {
    throw new Error("Error al cargar el archivo JSON");
  }

  const jsonData = await response.json();
  const bookArray = [...jsonData.mistborn, ...jsonData.archivo];
  const foundBook = bookArray.find((book) => book.id === res);

  if (foundBook) {
    const { id, title, content, imagePath } = foundBook;
    return { id, title, content, imagePath };
  } else if (res == "mistborn") {
    const def = bookArray[0];
    return def;
  } else if (res == "archivo") {
    const def = bookArray[1];
    return def;
  }
};

const findNumber = (res, element, numBook) => {
  res = res.split(" ");
  let titulo;
  for (let num of res) {
    if (num <= numBook) {
      titulo = element + num;
      document.querySelector(
        ".div-fotos"
      ).innerHTML += `<a href="/html/books.html"><img src="/img/${titulo}.png"><a/>`;
      return titulo;
    } else if (num > numBook) {
      return;
    }
  }
  if (res.includes("mistborn") | res.includes("archivo")) {
    document.querySelector(
      ".div-fotos"
    ).innerHTML += `<a href="/html/books.html"><img src="/img/${element}1.png"><a/>`;
    return element + "1";
  }
};
