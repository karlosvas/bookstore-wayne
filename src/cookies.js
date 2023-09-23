"use strict";

import { readJSON } from "./search.js";
import { Data } from "./search.js";
import { Carry } from "./carry.js";

export const addJSON = (book) => {
  readJSON(book)
    .then(() => {
      const bookData = Data.book;
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

export const updateCookies = () => {
  document.cookie = `carryCookie=${Carry.products}`
  document.cookie = `indexCarry=${Carry.indexCarry}`;
  document.cookie = `localCarry=${Carry.localCarry}`;
};
