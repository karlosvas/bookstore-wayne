"use strict";

import { Data } from "./search.js";
import { obtenerCookie, addJSON } from "./cookies.js";
import { updateStart, updateProduct } from "./update.js"
import { deleteProductEvent } from "./delate-carry.js"
import { updateCarry } from "./update.js";

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
  updateStart();
});

document.querySelector(".btn-add-carry").addEventListener("click", () => {
  Carry.localCarry++
  let index = Carry.products.indexOf(Data.book.title);
  if (index !== -1) Carry.indexCarry[index]++

  if (document.querySelector(".carry-list") == null) {
    makeCarry();
    main.querySelector(".carry-list").style.opacity = "0";
    Carry.open = true;
  }
  updateCarry();
});

const main = document.querySelector(".main");
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
  const productDivs = document.querySelectorAll('.div-producto')
  if (productDivs) {
    updateProduct()
    deleteProductEvent()
  }
};
