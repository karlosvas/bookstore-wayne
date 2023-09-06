"use strict";

import { readJSON } from "./search.js";
import { data } from "./search.js";

const addJSON = (book) => {
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

const obtenerCookie = (cookieName) => {
  let cookies = document.cookie;
  cookies = cookies.split(";");
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(cookieName)) cookie = cookie.split("=")[1];
    return cookie;
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const id = obtenerCookie("id");
  addJSON(id);
});
