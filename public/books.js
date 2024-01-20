'use strict'

import { obtenerCookie } from "./cookies.js";
import { addJsonDB } from "./readJSON.js";
import { updateStart } from "./update.js";
import { searchMatches } from "./search.js";


document.addEventListener("DOMContentLoaded", function () {
    let id = obtenerCookie("id").join();
    addJsonDB(id);
    updateStart();
});