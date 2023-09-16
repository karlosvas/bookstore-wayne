"use strict"

import { data } from "./search.js";
import { Carry } from "./carry.js";
import { obtenerCookie } from "./cookies.js"

export const updateStart = () => {
    let carry = obtenerCookie("carry");
    let localCarry = obtenerCookie("localCarry");
    let indexCarry = obtenerCookie("indexCarry");

    const getData = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                let book = data.book.title
                resolve(book)
            }, 500)
        })
    }

    if (carry !== undefined) {
        Carry.products = carry;
    }

    if (localCarry !== undefined) {
        getData().then((book) => {
            let comprobation = [...carry]
            const newComprobation = Object.values(comprobation);
            newComprobation.pop()

            let index = Carry.products.indexOf(book);
            if (Carry.products[index] !== book) {
                Carry.indexCarry.push(localCarry)
                document.cookie = `indexCarry=${Carry.indexCarry}`;
                Carry.localCarry = 0
                if (indexCarry[index] !== undefined) Carry.localCarry = indexCarry[index] // => Esta linea no se que hace
            } else if (newComprobation.includes(book)) {
                Carry.indexCarry[Carry.indexCarry.length] = localCarry
                document.cookie = `indexCarry=${Carry.indexCarry}`;
                Carry.localCarry = indexCarry[index]
            } else {
                Carry.localCarry = localCarry
            }
        })
    }

    if (indexCarry !== undefined) {
        Carry.indexCarry = indexCarry

    };
}

