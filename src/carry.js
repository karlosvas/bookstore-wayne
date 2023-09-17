"use strict";

import { data } from "./search.js";
import { obtenerCookie, addJSON, addCookie } from "./cookies.js";
import { updateStart, updateProduct, updateNewProduct } from "./update.js"

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
  Carry.localCarry++;
  document.cookie = `localCarry=${Carry.localCarry}`;
  if (document.querySelector(".carry-list") == null) {
    makeCarry();
    main.querySelector(".carry-list").style.opacity = "0";
    Carry.open = true;
    // if (Carry.indexCarry.length > 0) {
    //   console.log("make carry")
    //   updateProduct(Carry.products.length)
    // }
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
  updateProduct(Carry.products.length)
  /*
  if (Carry.indexCarry.length == 0) {
    console.log("Add product")
    updateProduct(Carry.products.length)
  }
  updateNewProduct()
  */
  deleteProductEventEvent();
  Carry.inCarry = true
};

const deleteProductEventEvent = () => {
  const productDivs = document.querySelectorAll(".div-producto");
  let indexCarry = Carry.indexCarry
  let carryCookie = Carry.products
  console.log(indexCarry)

  productDivs.forEach((btnProduct, index) => {

    btnProduct.addEventListener("click", (event) => {
      console.log(Carry.localCarry)

      event.stopPropagation();
      if (Carry.indexCarry[index] <= 1) {
        btnProduct.remove();
        Carry.indexCarry[index]--;
        indexCarry.splice(index, 1)
        carryCookie.splice(index, 1)
        document.cookie = `indexCarry=${indexCarry}`;
        document.cookie = `carryCookie=${carryCookie}`;
        Carry.inCarry = false;
      } else if (Carry.indexCarry[index] > 1) {
        Carry.indexCarry[index]--;
        document.cookie = `indexCarry=${Carry.indexCarry}`;
        updateCarry();
      } else if (Carry.localCarry > 1) {
        Carry.localCarry--
        document.cookie = `localCarry=${Carry.localCarry}`;
        updateCarry();
      } else if (Carry.localCarry == 1) {
        btnProduct.remove();
        Carry.localCarry--
        carryCookie.pop()
        console.log(Carry.localCarry)
        document.cookie = `localCarry=${Carry.localCarry}`;
        document.cookie = `carryCookie=${carryCookie}`;
        Carry.inCarry = false;
      }
    });
  });
}

const updateCarry = () => {
  if (Carry.inCarry == false && Carry.localCarry > 0) {
    addCookie();
    addProduct();
  }

  if (document.getElementById(`numBooks0`) !== null) {
    let index = Carry.products.indexOf(data.book.title);
    Object.values(data.allBooks).forEach(function (elemento) {
      console.log(elemento.title);
    });

    let total = 0
    for (let i = 0; i < Carry.products.length; i++) {
      if (i == index) {
        document.getElementById(`numBooks${index}`).textContent = Carry.localCarry;
      } else {
        document.getElementById(`numBooks${i}`).textContent = Carry.indexCarry[i];
      }
      if (i == index) {
        document.getElementById(`priceBooks${index}`).textContent = data.book.price;
        let priceString = data.book.price.replace("€", "");
        let priceBook = parseFloat(priceString.replace(",", "."))
        total = priceBook * Carry.localCarry
      } else {
        document.getElementById(`priceBooks${i}`).textContent = 0 + "€";
      }
      document.getElementById(`totalBooks`).textContent = total.toFixed(2)

    }
  }
};
