"use strict";

export function searchMatches(res) {
  if (res.includes("mistborn")) {
    findNumber(res, "mistborn");
  }
  if (res.includes("archivo") || res.includes("tormentas")) {
    findNumber(res, "archivo");
  }
}

const findNumber = (res, element) => {
  res = res.split(" ");
  let titulo;
  for (let num of res) {
    if (!isNaN(parseInt(num))) {
      titulo = element + num;
      document.querySelector(
        ".div-fotos"
      ).innerHTML += `<a href="${titulo}.html"><img src="../img/${titulo}.png"><a/>`;
      return titulo;
    }
  }
  if (titulo == undefined) {
    titulo = element;
    document.querySelector(
      ".div-fotos"
    ).innerHTML += `<a href="${titulo}.html"><img src="../img/${titulo}1.png"><a/>`;
  }
};
