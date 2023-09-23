"use strict"

import { data } from "./search.js";
import { Carry } from "./carry.js";
import { obtenerCookie } from "./cookies.js"

export const updateStart = () => {
    let indexCarry = obtenerCookie("indexCarry");
    let carryCookie = obtenerCookie("carryCookie")

    if (Carry.indexCarry !== undefined) {
        Carry.indexCarry = indexCarry
    }

    if (carryCookie !== undefined) {
        Carry.products = carryCookie;
    }

}

// if (carryCookie !== undefined) {
//     if (carryCookie[0] == "") {
//         carryCookie.shift()
//     }
//     Carry.products = carryCookie;
// }
// let comprobation = [...carryCookie]
// const newComprobation = Object.values(comprobation);
// newComprobation.pop()
// let index = Carry.products.indexOf(book);
// if (Carry.products[index] !== book && localCarry[0] !== "0") {
//     Carry.indexCarry.push(localCarry)
//     document.cookie = `indexCarry=${Carry.indexCarry}`;
//     Carry.localCarry = 0
// } else if (newComprobation.includes(book) && localCarry[0] !== "0") {
//     if (Carry.indexCarry.length < carryCookie.length) {
//         Carry.indexCarry[Carry.indexCarry.length] = localCarry
//         document.cookie = `indexCarry=${Carry.indexCarry}`;
//         console.log(Carry)
//     }
//     Carry.localCarry = indexCarry[index]
// } else {
//     Carry.localCarry = localCarry
// }
// if (indexCarry !== undefined) {
//     if (indexCarry[0] == "") {
//         indexCarry.shift()
//     }
//     Carry.indexCarry = indexCarry
// };

export const addProduct = (() => {
    const book = data.book.title;
    console.log(book)
    if (!Carry.products.includes(book)) Carry.products.push(book)

    for (let i = 0; i < Carry.products.length; i++) {
        const deleteButton = document.createElement("button");
        const deleteImage = document.createElement("img");
        const product = document.createElement("div");
        const p = document.createElement("p");
        const nameBooks = document.createTextNode(Carry.products[i]);
        const numBooks = document.createElement("p");
        const totalBooks = document.createElement("p");
        const priceBooks = document.createElement("b");
        deleteImage.src = "/img/x.png";
        deleteImage.classList.add("delate-img");
        product.classList.add("div-producto");
        deleteButton.classList.add("btn-product");
        numBooks.classList.add("numBook");
        priceBooks.classList.add("priceBooks");
        numBooks.id = `numBooks${i}`;
        priceBooks.id = `priceBooks${i}`;
        deleteButton.id = `numBooks${i}`;
        totalBooks.id = `totalBooks`;
        document.querySelector(".carry-list").appendChild(product);
        deleteButton.appendChild(deleteImage);
        p.appendChild(nameBooks);
        product.appendChild(p);
        product.appendChild(numBooks);
        product.appendChild(priceBooks);
        product.appendChild(deleteButton);
        product.appendChild(totalBooks);
    }
})