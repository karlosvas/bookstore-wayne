"use strict";

import { searchMatches } from "./search.js";
import { books } from "./search.js";

const btn = document.getElementById("btn-search");
const input = document.getElementById("input");

let res = "";

btn.addEventListener("click", () => {
  res = input.value;
  input.value = "";
  if (books < 20) {
    searchMatches(res);
  }
});

input.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    res = input.value;
    input.value = "";
    if (books < 20) {
      searchMatches(res);
      input.value = "";
    }
  }
});
