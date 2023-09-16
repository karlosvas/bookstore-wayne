"use strict";

import { readJSON } from "./search.js";
import { data } from "./search.js";
import { Carry } from "./carry.js";

export const addJSON = (book) => {
  readJSON(book)
    .then(() => {
      const bookData = data.book;

      if (bookData) {
        document.getElementById("title").textContent = bookData.title;
        document.getElementById("content").textContent = bookData.content;
        document.getElementById("imgPath").src = bookData.imagePath;
        document.getElementById("price").textContent = bookData.price;
      } else {
        console.error("No se encontró el libro solicitado.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const obtenerCookie = (cookieName) => {
  let cookies = document.cookie;
  cookies = cookies.split(";");

  for (let cookie of cookies) {
    cookie = cookie.trim();

    if (cookie.startsWith(cookieName)) {
      cookie = cookie.split("=")[1];
      return cookie.split(",");
    }
  }
};

export const addCookie = () => {
  const book = data.book.title;

  console.log(data.book.title, Carry.products[Carry.products.length - 1])
  if (Carry.products == undefined) {
    Carry.products = [book];
    document.cookie = `carry=${Carry.products}`;
  } else if (!Carry.products.includes(book)) {
    Carry.products.push(book);
    document.cookie = `carry=${Carry.products}`;
  }

  if (Carry.indexCarry == undefined) {
    Carry.indexCarry = [Carry.localCarry]
    document.cookie = `indexCarry=${Carry.indexCarry}`;
  }
};
