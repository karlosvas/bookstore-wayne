"use strict";

import { searchMatches } from "./search.js";
import { books } from "./search.js";

const input = document.getElementById("input");
const home = document.getElementById("home");

let res = "";

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

if (home != null) {
  home.addEventListener("click", () => {
    document.cookie = " ";
    window.location.href = "/";
  });
}
