"use strict";

import { data } from "./search.js";
const addCarry = document.querySelector(".btn-carry");
import { obtenerCookie, addJSON, cookiesCarry, addCookie } from "./cookies.js";

export let carryObj = {
  products: [],
  open: false,
  carry: false,
  numCookie: 0,
  carryLocal: 0,
  numLocal: [],
};

document.addEventListener("DOMContentLoaded", function () {
  const id = obtenerCookie("id");
  cookiesCarry();
  addJSON(id);
});
addCarry.addEventListener("click", () => {
  carryObj.carryLocal;
  carryObj.numCookie++;
  addCookie();
  if (document.querySelector(".carry-list") == null) {
    makeCarry();
    main.querySelector(".carry-list").style.opacity = "0";
    carryObj.open = true;
  }
  updateCarry();
});

const main = document.querySelector(".div-main");
carry.addEventListener("click", () => {
  if (document.querySelector(".carry-list") == null) {
    makeCarry();
    updateCarry();
    carryObj.open = true;
  }
  if (carryObj.open == true) {
    updateCarry();
    main.querySelector(".carry-list").style.opacity = "1";
    carryObj.open = false;
  } else {
    main.querySelector(".carry-list").style.opacity = "0";
    carryObj.open = true;
  }
});

const makeCarry = () => {
  const carrito = document.createElement("div");
  const carryContent = document.createTextNode(`Su carrito es:`);

  carrito.classList.add("carry-list");
  carrito.appendChild(carryContent);

  main.appendChild(carrito);
};

const addProduct = (book) => {
  if (carryObj.products == undefined) {
    carryObj.products = [data.book.title];
    document.cookie = `carry=${carryObj.products}`;
  } else if (!carryObj.products.includes(book)) {
    carryObj.products.push(data.book.title);
    document.cookie = `carry=${carryObj.products}`;
  }
  for (let i = 0; i < carryObj.products.length; i++) {
    const deleteButton = document.createElement("button");
    const deleteImage = document.createElement("img");
    const product = document.createElement("div");
    const p = document.createElement("p");
    const ptext = document.createTextNode(carryObj.products[i]);
    const numBooks = document.createElement("p");

    deleteImage.src = "/img/x.png";
    deleteImage.classList.add("delate-img");
    product.classList.add("div-producto");
    deleteButton.classList.add("btn-product");
    numBooks.classList.add("numBook");
    numBooks.id = `numBooks${i}`;
    deleteButton.id = `numBooks${i}`;
    document.querySelector(".carry-list").appendChild(product);
    deleteButton.appendChild(deleteImage);
    p.appendChild(ptext);
    product.appendChild(p);
    product.appendChild(numBooks);
    product.appendChild(deleteButton);
  }
  carryObj.carry = true;
  deleteProductEventEvent();
};

const deleteProductEventEvent = () => {
  const productDivs = document.querySelectorAll(".div-producto");
  for (let btnProduct of productDivs) {
    btnProduct.addEventListener("click", (event) => {
      event.stopPropagation();
      if (carryObj.numCookie <= 1) {
        btnProduct.remove();
        carryObj.numCookie--;
        carryObj.carry = false;
      } else if (carryObj.numCookie > 1) {
        carryObj.numCookie--;
        updateCarry();
      }
    });
  }
};

const updateCarry = () => {
  if (carryObj.carry == false && carryObj.numCookie > 0) {
    addProduct(data.book.title);
  }
  if (document.getElementById(`numBooks0`) !== null) {
    let index = carryObj.products.indexOf(data.book.title);
    findCarryLocal(index);
    for (let i = 0; i < carryObj.products.length; i++) {
      document.getElementById(`numBooks${index}`).textContent =
        carryObj.numLocal[index];
    }
  }
};

const findCarryLocal = (index) => {
  carryObj.numLocal = Object.values(carryObj.numLocal);
  carryObj.numLocal[index] = carryObj.carryLocal;
};
