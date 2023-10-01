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
// const books = document.querySelectorAll(".img-main")


input.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    let res = input.value
    input.value = "";
    if (document.querySelectorAll(".img-main").length < 15) {
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
  readJsonDB()
});