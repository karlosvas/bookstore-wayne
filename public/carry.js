'use strict'

import { Data } from "./main.js";
import { deleteProductEvent } from "./delateCarry.js"
import { updateProduct, updateCarry } from "./update.js"

export let Carry = {
  products: [],
  indexCarry: [],
  localCarry: 0,
  open: false,
  inCarry: false,
};

// Abre y cierra el carrito
const main = document.querySelector("main");
document.getElementById("carry").addEventListener("click", () => {
  // Si no existe el carrito lo crea
  if (document.querySelector(".carry-list") == null) {
    makeCarry();
    updateCarry();
    Carry.open = true;
  }
  // Si existe lo abre o cierra
  if (Carry.open == true) {
    main.querySelector(".carry-list").style.opacity = "1";
    updateCarry();
    Carry.open = false;
  } else {
    main.querySelector(".carry-list").style.opacity = "0";
    Carry.open = true;
  }
});

// Crea el carrito
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

// Botón de añadir al carrito
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