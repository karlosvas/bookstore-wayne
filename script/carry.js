"use strict";

import { searchMatches } from "./search.js";

const btn = document.getElementById("btn-search");
const input = document.getElementById("input");
const btnCarry = document.querySelector(".btn-carry");
const title = document.getElementById("title");

let res = "";

btn.addEventListener("click", () => {
  res = input.value;
  searchMatches(res);
  input.value = "";
});

input.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    res = input.value;
    input.value = "";
    searchMatches(res);
  }
});

let carry = [];

btnCarry.addEventListener("click", () => {
  carry = [title.innerHTML];
});

let abierto = true;
const main = document.querySelector(".div-main");

document.getElementById("carry").addEventListener("click", () => {
  if (abierto == true && document.querySelector(".carry-list") == null) {
    makeCarry();
    updateCarry();
  } else if (abierto) {
    updateCarry();
    document.querySelector(".carry-list").style.opacity = "1";
    abierto = false;
  } else {
    main.querySelector(".carry-list").style.opacity = "0";
    abierto = true;
  }
});

const makeCarry = () => {
  const carrito = document.createElement("div");
  const carryContent = document.createTextNode(`Su carrito es:`);

  carrito.classList.add("carry-list");
  carrito.appendChild(carryContent);

  main.appendChild(carrito);
  abierto = false;
};

const addProduct = () => {
  const deleteButton = document.createElement("button");
  const deleteImage = document.createElement("img");
  const product = document.createElement("div");
  const p = document.createElement("p");
  const ptext = document.createTextNode(carry);

  deleteImage.src = "../img/x.png";
  deleteImage.classList.add("delate-img");
  product.classList.add("div-producto");
  deleteButton.classList.add("delate-producto");
  document.querySelector(".carry-list").appendChild(product);
  deleteButton.appendChild(deleteImage);
  p.appendChild(ptext);
  product.appendChild(p);
  product.appendChild(deleteButton);
};

const delateProduct = () => {
  if (document.querySelector(".delate-producto") !== null) {
    document.querySelector(".delate-producto").addEventListener("click", () => {
      carry.pop();
      document.querySelector(".div-producto").remove();
    });
  }
};

const updateCarry = () => {
  if (carry.length > 0) {
    addProduct();
  }
  delateProduct();
};
