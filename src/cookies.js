"use strict";

import { Carry } from "./carry.js";

export const obtenerCookie = (cookieName) => {
  let cookies = document.cookie;
  cookies = cookies.split(";");

  for (let cookie of cookies) {
    cookie = cookie.trim();

    if (cookie.startsWith(cookieName)) {
      cookie = cookie.split("=")[1];
      return cookie.split(",");
    }
  }
};

export const updateCookies = () => {
  document.cookie = `carryCookie=${Carry.products}`
  document.cookie = `indexCarry=${Carry.indexCarry}`;
  document.cookie = `localCarry=${Carry.localCarry}`;
};
