"use strict";

import { data } from "./search.js";
import { obtenerCookie, addJSON, updateCookies } from "./cookies.js";
import { updateStart, updateProduct, updateNewProduct } from "./update.js"
import { deleteProductEvent, deleteNewProductEvent } from "./delate-carry.js"

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

document.querySelector(".btn-carry").addEventListener("click", () => {
  Carry.localCarry++
  let index = Carry.products.indexOf(data.book.title);
  if (index !== -1) Carry.indexCarry[index]++

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
  const productDivs = document.querySelectorAll('.div-producto')
  if (productDivs) {
    updateProduct()
    deleteProductEvent()
  }
};

const updateCarry = () => {
  if (!Carry.products.includes(data.book.title) && Carry.inCarry == false && Carry.localCarry > 0) {
    updateNewProduct()
    deleteNewProductEvent()
    Carry.inCarry = true
  }
  const productDivs = document.querySelectorAll('.div-producto')
  if (productDivs) {
    productDivs.forEach((elemento, i) => {
      let total = 0;
      // Numero de productos
      if (elemento.textContent == data.book.title) {
        elemento.querySelector('.numBook').textContent = Carry.localCarry;
      } else {
        elemento.querySelector('.numBook').textContent = Carry.indexCarry[i];
      }

      // Precio de productos
      let actualBookPrice;
      Object.values(data.allBooks).forEach(function (book) {
        if (book.title === Carry.products[i]) {
          actualBookPrice = book.price;
        }
      });

      let priceString = actualBookPrice.replace('€', '');
      let priceBook = parseFloat(priceString.replace(',', '.'));

      if (Carry.indexCarry[i] == undefined) {
        total += priceBook * Carry.localCarry;
      } else {
        total += priceBook * Carry.indexCarry[i];
      }

      elemento.querySelector('.priceBooks').textContent = total.toFixed(2) + '€';
      document.getElementById('totalBooks').textContent = total.toFixed(2) + '€';
    });
  }
  updateCookies();
}
