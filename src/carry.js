"use strict";

import { data } from "./search.js";
import { obtenerCookie, addJSON, addCookie } from "./cookies.js";
import { updateStart, addProduct } from "./update.js"

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
  console.log(Carry)
  let index = Carry.products.indexOf(data.book.title);
  if (index !== -1) {
    console.log("Forma 1")
    Carry.indexCarry[index]++
  } else if (Carry.indexCarry == undefined) {
    Carry.indexCarry = [1]
  }

  console.log(Carry.indexCarry)

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

const deleteProductEvent = () => {
  let indexCarry = Carry.indexCarry;
  let carryCookie = Carry.products;

  const productDivs = document.querySelectorAll(".div-producto");
  if (productDivs) {
    productDivs.forEach((btnProduct, index) => {
      btnProduct.addEventListener("click", (event) => {
        handleClick(event, btnProduct, index);
      });
    });
  }

  function handleClick(event, btnProduct, index) {
    event.stopPropagation();
    if (Carry.indexCarry[index] == 1) {
      btnProduct.remove();
      indexCarry.splice(index, 1);
      carryCookie.splice(index, 1);
      document.cookie = `indexCarry=${indexCarry}`;
      document.cookie = `carryCookie=${carryCookie}`;
      Carry.inCarry = false;

    } else if (Carry.indexCarry[index] > 1) {
      Carry.indexCarry[index]--;
      document.cookie = `indexCarry=${Carry.indexCarry}`;

    }
    updateCarry();
  }
};



const updateCarry = () => {
  let index = Carry.products.indexOf(data.book.title);
  if (Carry.inCarry == false) {
    addProduct();
    deleteProductEvent();
    Carry.inCarry = true
  }
  addCookie();
  if (document.getElementById(`numBooks0`) !== null) {
    let total = 0

    for (let i = 0; i < Carry.products.length; i++) {
      // Numero de productos
      if (i == index) {
        document.getElementById(`numBooks${index}`).textContent = Carry.localCarry;
      } else {
        document.getElementById(`numBooks${i}`).textContent = Carry.indexCarry[i];
      }

      // Precio de productos
      let actualBookPrice
      Object.values(data.allBooks).forEach(function (elemento) {
        if (elemento.title === Carry.products[i]) {
          actualBookPrice = elemento.price
        }
      });

      let priceString = actualBookPrice.replace("€", "");
      let priceBook = parseFloat(priceString.replace(",", "."))

      if (i == index) {
        let total = priceBook * Carry.localCarry
        document.getElementById(`priceBooks${i}`).textContent = total.toFixed(2) + "€"
      } else {
        let total = priceBook * Carry.indexCarry[i]
        document.getElementById(`priceBooks${i}`).textContent = total.toFixed(2) + "€"
      }

      if (Carry.indexCarry[i] == undefined) total += priceBook * Carry.localCarry
      else total += priceBook * Carry.indexCarry[i]
      document.getElementById(`totalBooks`).textContent = total.toFixed(2) + "€"
    }
  }
};
