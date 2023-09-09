"use strict";

import { data } from "./search.js";
const addCarry = document.querySelector(".btn-carry");
import { obtenerCookie, addJSON, cookiesCarry } from "./cookies.js";

export let carryObj = {
  products: [],
  open: false,
  carry: false,
  numCookie: 0,
  carryLocal: 0,
};

document.addEventListener("DOMContentLoaded", function () {
  const id = obtenerCookie("id");
  cookiesCarry();
  addJSON(id);
});

const addCookie = () => {
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

addCarry.addEventListener("click", () => {
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
    document.querySelector(".carry-list").style.opacity = "1";
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
    console.log("No esta incluido");
    carryObj.products.push(data.book.title);
    document.cookie = `carry=${carryObj.products}`;
  }
  console.log(carryObj.products);
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
  console.log("se puede borrar");
  const productDivs = document.querySelectorAll(".div-producto");

  productDivs.forEach((productDiv) => {
    const btnProduct = productDiv.querySelector(".btn-product");
    btnProduct.addEventListener("click", (event) => {
      event.stopPropagation();
      console.log(carryObj.numCookie);
      if (carryObj.numCookie == 1) {
        console.log("ultimo");
        console.log(productDiv, carryObj.numCookie);
        productDiv.remove();
        carryObj.numCookie--;
        carryObj.carry = false;
      } else if (carryObj.numCookie > 1) {
        carryObj.numCookie--;
        updateCarry();
      }
    });
  });
};

const updateCarry = () => {
  if (carryObj.carry == false && carryObj.numCookie > 0) {
    console.log("añadiendo producto");
    addProduct(data.book.title);
  }
  if (document.getElementById(`numBooks0`) !== null) {
    for (let i = 0; i < carryObj.products.length; i++) {
      let index = carryObj.products.indexOf(data.book.title);
      if (i == index) {
        document.getElementById(`numBooks${i}`).textContent =
          carryObj.carryLocal;
      } else {
        document.getElementById(`numBooks${i}`).textContent =
          carryObj.numCookie;
      }
    }
  }
};
