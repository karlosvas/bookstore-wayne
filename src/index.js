"use strict";

import { searchMatches } from "./search.js";
import { readJsonDB } from "./readJSON.js";

export let Data = {
  collection: [],
  allBooks: [],
  book: "",
  searchBooks: 0,
};

const input = document.getElementById("input-search");
const books = document.querySelectorAll(".img-main")


input.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    let res = input.value
    input.value = "";
    if (books.length < 15) {
      console.log(res)
      searchMatches(res);
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