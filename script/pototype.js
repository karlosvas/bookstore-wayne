"use strict";

import { readJSON } from "./search.js";

const addJSON = (book) =>
  readJSON(book)
    .then((bookData) => {
      document.getElementById("title").textContent = bookData.title;
      document.getElementById("content").textContent = bookData.content;
      document.getElementById("imgPath").src = bookData.imagePath;
    })
    .catch((error) => {
      console.error("Error:", error);
    });

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
