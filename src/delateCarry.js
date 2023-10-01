"use strict"
import { Carry } from "./carry.js"
import { Data } from "./index.js"
import { updateCarry } from "./update.js"
import { updateCookies } from "./cookies.js"

export const deleteProductEvent = () => {
    const productDivs = document.querySelectorAll(".div-producto");
    if (productDivs) {
        productDivs.forEach((btnProduct, index) => {
            btnProduct.addEventListener("click", (event) => {
                handleClick(event, btnProduct, index);
            });
        });
    }
}

export const deleteNewProductEvent = () => {
    const productDivs = document.querySelectorAll(".div-producto");
    const lastBtnProduct = productDivs[productDivs.length - 1]
    if (productDivs) {
        lastBtnProduct.addEventListener("click", (event) => {
            handleClick(event, lastBtnProduct, productDivs.length - 1);
        });
    }
}

function handleClick(event, btnProduct, index) {
    event.stopPropagation();
    let indexBook = Carry.products.indexOf(Data.book.title);
    if (Carry.indexCarry[index] <= 1) {
        Carry.indexCarry[index]--;
        btnProduct.remove();
        Carry.indexCarry.splice(index, 1);
        Carry.products.splice(index, 1);
        if (index == indexBook) Carry.localCarry--;
        updateCookies()
        Carry.inCarry = false
    } else if (Carry.indexCarry[index] > 1) {
        Carry.indexCarry[index]--;
        let indexBook = Carry.products.indexOf(Data.book.title);
        if (index == indexBook) Carry.localCarry--;
        updateCarry()
    }
}
