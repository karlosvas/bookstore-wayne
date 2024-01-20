"use strict"

import { Data } from "./main.js";
import { Carry } from "./carry.js";
import { obtenerCookie, updateCookies } from "./cookies.js"
import { deleteNewProductEvent } from "./delateCarry.js"

export const updateStart = () => {
    let indexCarry = obtenerCookie("indexCarry");
    let carryCookie = obtenerCookie("carryCookie")
    let localCarry = obtenerCookie("localCarry")

    if (Carry.indexCarry !== undefined) {
        Carry.indexCarry = indexCarry
    }

    if (carryCookie !== undefined && carryCookie[0] !== "") {
        Carry.products = carryCookie;
    }

    if (localCarry !== undefined) {
        setTimeout(() => {
            if (Carry.products.includes(Data.book.title)) Carry.localCarry = localCarry;
            else Carry.localCarry = 0;
        }, 100)
    }

}

export const updateProduct = (() => {
    for (let i = 0; i < Carry.products.length; i++) {
        if (Carry.localCarry == 0) return
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
    const book = Data.book.title;
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

export const updateCarry = () => {
    if (!Carry.products.includes(Data.book.title) && Carry.inCarry == false && Carry.localCarry > 0) {
        updateNewProduct()
        deleteNewProductEvent()
        Carry.inCarry = true
    }
    const productDivs = document.querySelectorAll('.div-producto')
    if (productDivs) {
        productDivs.forEach((elemento, i) => {
            let total = 0;
            // Numero de productos
            if (elemento.textContent == Data.book.title) {
                elemento.querySelector('.numBook').textContent = Carry.localCarry;
            } else {
                elemento.querySelector('.numBook').textContent = Carry.indexCarry[i];
            }

            // Precio de productos
            let actualBookPrice;
            Object.values(Data.allBooks).forEach(function (book) {
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