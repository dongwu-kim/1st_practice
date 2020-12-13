// import logMedia from "media_variables.js";

const chairImageLow = document.querySelector(".index-main__chair-low"),
  chairImageHigh = document.querySelector(".index-main__chair-high"),
  bodyBgColor = document.querySelector("body");

const lowImg = new Image();
const highImg = new Image();

function paintLowImage() {
  lowImg.src = `img/chair_blue.gif`;
  chairImageLow.append(lowImg);
  lowImg.classList.add(`bg-chair`);
}

function paintHighImage() {
  highImg.src = `img/chair_black.gif`;
  highImg.classList.add(`bg-chair`);
  chairImageHigh.append(highImg);
}

function bodyColorChange() {
  bodyBgColor.classList.add(`changed`);
}

function handleHighImageLoad() {
  lowImg.classList.add(`fadeout`);
  highImg.classList.add(`fadein`);
  highImg.classList.remove(`invisible`);
  bodyColorChange();
}

function loadHighImage() {
  paintHighImage();
  highImg.addEventListener(`load`, handleHighImageLoad);
}

function highImgPromise() {
  return (highImgPromise = new Promise(
    (resolve) => {
      setTimeout(() => {
        resolve(loadHighImage());
      }, 800);
    },
    (reject) => {
      reject(console.log(`rejected`));
    }
  ));
}

async function asyncLoadHighImage() {
  await highImgPromise();
}

function init() {
  paintLowImage();
  asyncLoadHighImage();
}

init();
