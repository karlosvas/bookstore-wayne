"use strict";

import { searchMatches } from "./search.js";
import { readJsonDB } from "./readJSON.js";

export let Data = {
  collection: [],
  allBooks: [],
  book: "",
  searchBooks: 0,
};

const search = document.getElementById("input-search");
const divRel = document.querySelector(".div-main");

search.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    let res = search.value
    search.value = "";

    if (divRel.childElementCount < 15) {
      searchMatches(res, divRel);
    }
  }

});

home.addEventListener("click", () => {
  document.cookie = " ";
  window.location.href = "/";
});

document.addEventListener("DOMContentLoaded", () => {
  readJsonDB()
});