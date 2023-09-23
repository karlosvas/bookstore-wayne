"use strict";

import { searchMatches } from "./search.js";
import { Data } from "./search.js";

const input = document.getElementById("input");
const home = document.getElementById("home");

let res = "";

input.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    res = input.value;
    res = res.toLocaleLowerCase()
    input.value = "";
    if (Data.searchBooks < 20) {
      searchMatches(res.split(" "));
      input.value = "";
    }
  }
});


if (home != null) {
  home.addEventListener("click", () => {
    document.cookie = " ";
    window.location.href = "/";
  });
}
