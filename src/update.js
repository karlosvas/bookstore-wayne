"use strict"

import { data } from "./search.js";
import { Carry } from "./carry.js";
import { obtenerCookie } from "./cookies.js"
export const updateStart = () => {
    let indexCarry = obtenerCookie("indexCarry");
    let carryCookie = obtenerCookie("carryCookie")
    let localCarry = obtenerCookie("localCarry")

    if (Carry.indexCarry !== undefined) {
        Carry.indexCarry = indexCarry
    }

    if (carryCookie !== undefined) {
        Carry.products = carryCookie;
    }

    if (localCarry !== undefined) {
        setTimeout(() => {
            if (Carry.products.includes(data.book.title)) Carry.localCarry = localCarry;
            else Carry.localCarry = 0;
        }, 100)
    }

}

export const updateProduct = (() => {
    for (let i = 0; i < Carry.products.length; i++) {
        const deleteButton = document.createElement("button");
        const productDiv = document.createElement("div");
        const product = document.createElement("p");
        const nameBooks = document.createTextNode(Carry.products[i]);
        const numBooks = document.createElement("p");
        const priceBooks = document.createElement("b");
        const buttonContent = document.createTextNode("✖️");
        const totalBooks = document.createElement("p");

        productDiv.classList.add("div-producto");
        deleteButton.classList.add("btn-product");
        numBooks.classList.add("numBook");
        priceBooks.classList.add("priceBooks");
        totalBooks.id = `totalBooks`;
        product.id = `product`;

        document.querySelector(".carry-list").appendChild(productDiv);
        deleteButton.appendChild(buttonContent)
        product.appendChild(nameBooks);
        productDiv.appendChild(product);
        productDiv.appendChild(numBooks);
        productDiv.appendChild(priceBooks);
        productDiv.appendChild(deleteButton);
        productDiv.appendChild(totalBooks);
    }
})

export const updateNewProduct = (() => {
    const book = data.book.title;
    Carry.products.push(book)
    if (Carry.indexCarry == undefined) Carry.indexCarry = [Carry.localCarry]
    else Carry.indexCarry.push(Carry.localCarry)
    const deleteButton = document.createElement("button");
    const productDiv = document.createElement("div");
    const product = document.createElement("p");
    const nameBooks = document.createTextNode(Carry.products[Carry.products.length - 1]);
    const numBooks = document.createElement("p");
    const priceBooks = document.createElement("b");
    const buttonContent = document.createTextNode("✖️");
    const totalBooks = document.createElement("p");

    productDiv.classList.add("div-producto");
    deleteButton.classList.add("btn-product");
    numBooks.classList.add("numBook");
    priceBooks.classList.add("priceBooks");
    totalBooks.id = `totalBooks`;
    product.id = `product`;

    document.querySelector(".carry-list").appendChild(productDiv);
    deleteButton.appendChild(buttonContent)
    product.appendChild(nameBooks);
    productDiv.appendChild(product);
    productDiv.appendChild(numBooks);
    productDiv.appendChild(priceBooks);
    productDiv.appendChild(deleteButton);
    productDiv.appendChild(totalBooks);
})