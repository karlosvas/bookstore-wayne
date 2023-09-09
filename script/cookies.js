"use strict";

import { readJSON } from "./search.js";
import { data } from "./search.js";
import { carryObj } from "./carry.js";

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
      return cookie;
    }
  }
};

export const cookiesCarry = () => {
  let carry = obtenerCookie("carry");
  let numCookie = obtenerCookie("numCookie");

  if (carryObj.products !== undefined && carry !== undefined) {
    console.log(carry);
    carry = carry.split(",");
    carryObj.products = carry;
  }
  if (numCookie !== undefined) {
    carryObj.numCookie = numCookie;
  }
  console.log(carry, numCookie);
};

export const addCookie = () => {
  carryObj.carryLocal++;
  if (carryObj.numCookie == 1) {
    document.cookie = `carry=${data.book.title}`;
  } else if (
    !carryObj.products.includes(data.book.title) &&
    carryObj.numCookie > 1
  ) {
    document.cookie = `carry=${carryObj.products}`;
  }
  document.cookie = `numCookie=${carryObj.numCookie}`;
};
