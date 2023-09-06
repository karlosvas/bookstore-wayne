"use strict";

const addCarry = document.querySelector(".btn-carry");
const title = document.getElementById("title");

let carryObj = {
  products: [],
  open: false,
  carry: false,
  numBooks: 0,
};

addCarry.addEventListener("click", () => {
  carryObj.products.push(title.innerHTML);
  carryObj.numBooks++;
  if (document.querySelector(".carry-list") == null) {
    makeCarry();
    main.querySelector(".carry-list").style.opacity = "0";
    carryObj.open = true;
  }
  updateCarry();
  if (carryObj.numBooks == 1) {
    deleteProductEventEvent();
  }
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
  const deleteButton = document.createElement("button");
  const deleteImage = document.createElement("img");
  const product = document.createElement("div");
  const p = document.createElement("p");
  const ptext = document.createTextNode(book);
  const numBooks = document.createElement("p");

  deleteImage.src = "/img/x.png";
  deleteImage.classList.add("delate-img");
  product.classList.add("div-producto");
  deleteButton.classList.add("btn-product");
  numBooks.id = "numBooks";
  document.querySelector(".carry-list").appendChild(product);
  deleteButton.appendChild(deleteImage);
  p.appendChild(ptext);
  product.appendChild(p);
  product.appendChild(numBooks);
  product.appendChild(deleteButton);

  if (carryObj.products.includes(book)) {
    carryObj.carry = true;
  }
};

const deleteProductEventEvent = () => {
  console.log("afirmativo");
  const productDivs = document.querySelectorAll(".div-producto");

  productDivs.forEach((productDiv) => {
    const btnProduct = productDiv.querySelector(".btn-product");
    btnProduct.addEventListener("click", (event) => {
      event.stopPropagation();
      if (carryObj.numBooks == 1) {
        productDiv.remove();
        carryObj.numBooks--;
        carryObj.carry = false;
      }
      if (carryObj.numBooks > 1) {
        carryObj.numBooks--;
      }
      updateCarry();
    });
  });
};

const updateCarry = () => {
  let book = carryObj.products[0];
  if (carryObj.carry == false && carryObj.numBooks > 0) addProduct(book);
  if (document.getElementById("numBooks") !== null) {
    document.getElementById("numBooks").textContent = carryObj.numBooks;
  }
};
