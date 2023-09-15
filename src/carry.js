"use strict";

import { data } from "./search.js";
const addCarry = document.querySelector(".btn-carry");
import { obtenerCookie, addJSON, cookiesCarry, addCookie } from "./cookies.js";

export let Carry = {
  products: [],
  indexCarry: [],
  localCarry: 0,
  open: false,
  inCarry: false,
};


document.addEventListener("DOMContentLoaded", function () {
  let id = obtenerCookie("id").join();
  addJSON(id);
  cookiesCarry();
});

addCarry.addEventListener("click", () => {
  Carry.localCarry++;
  document.cookie = `localCarry=${Carry.localCarry}`;
  if (document.querySelector(".carry-list") == null) {
    makeCarry();
    main.querySelector(".carry-list").style.opacity = "0";
    Carry.open = true;
  }
  updateCarry();
});

const main = document.querySelector(".div-main");
document.getElementById("carry").addEventListener("click", () => {
  if (document.querySelector(".carry-list") == null) {
    makeCarry();
    updateCarry();
    Carry.open = true;
  }
  if (Carry.open == true) {
    updateCarry();
    main.querySelector(".carry-list").style.opacity = "1";
    Carry.open = false;
  } else {
    main.querySelector(".carry-list").style.opacity = "0";
    Carry.open = true;
  }
});

const makeCarry = () => {
  const carrito = document.createElement("div");
  const carryContent = document.createTextNode(`Su carrito es:`);

  carrito.classList.add("carry-list");
  carrito.appendChild(carryContent);

  main.appendChild(carrito);
};

const addProduct = () => {
  for (let i = 0; i < Carry.products.length; i++) {
    const deleteButton = document.createElement("button");
    const deleteImage = document.createElement("img");
    const product = document.createElement("div");
    const p = document.createElement("p");
    const ptext = document.createTextNode(Carry.products[i]);
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
  Carry.inCarry = true;
  deleteProductEventEvent();
};

const deleteProductEventEvent = () => {
  const productDivs = document.querySelectorAll(".div-producto");
  for (let btnProduct of productDivs) {
    btnProduct.addEventListener("click", (event) => {
      event.stopPropagation();
      if (Carry.localCarry <= 1) {
        btnProduct.remove();
        Carry.localCarry--;
        let indexCarry = obtenerCookie("indexCarry")
        indexCarry.pop()
        document.cookie = `indexCarry=${indexCarry}`;
        let carry = obtenerCookie("carry")
        carry.pop()
        document.cookie = `carry=${carry}`;
        Carry.inCarry = false;
      } else if (Carry.localCarry > 1) {
        Carry.localCarry--;
        document.cookie = `localCarry=${Carry.localCarry}`;
        updateCarry();
      }
    });
  }
};

const updateCarry = () => {
  if (Carry.inCarry == false && Carry.localCarry > 0) {
    addCookie();
    addProduct();
  }

  if (document.getElementById(`numBooks0`) !== null) {
    let index = Carry.products.indexOf(data.book.title);

    for (let i = 0; i < Carry.products.length; i++) {
      if (i == index) {
        document.getElementById(`numBooks${index}`).textContent = Carry.localCarry;
      } else {
        document.getElementById(`numBooks${i}`).textContent = Carry.indexCarry[i];
      }
    }

  }
};
