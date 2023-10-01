"use strict";

import { readJSON, searchMatches } from "./search.js";

export let Data = {
  collection: [],
  allBooks: [],
  book: "",
  searchBooks: 0,
};

const input = document.getElementById("input-search");
// const books = document.querySelectorAll(".img-main")

input.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    let res = input.value.replace(/\s+/g, '').toLocaleLowerCase()
    input.value = "";
    if (Data.searchBooks < 20) {
      searchMatches(res);
    }
  }
});

if (home != null) {
  home.addEventListener("click", () => {
    document.cookie = " ";
    window.location.href = "/";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  readJSON()
});