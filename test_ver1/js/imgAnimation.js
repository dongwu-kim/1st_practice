import { projectorAnimation, projectorAnimationRemove } from "./projector.js";

const chairImageLow = document.querySelector(".index-main__chair-low"),
  chairImageHigh = document.querySelector(".index-main__chair-high"),
  bodyBgColor = document.querySelector("body");

function paintLowImage(file, className) {
  const lowImg = new Image();
  lowImg.src = file;
  chairImageLow.append(lowImg);
  lowImg.classList.add(className);
}

function paintHighImage(file, className) {
  const highImg = new Image();
  highImg.src = file;
  highImg.classList.add(className);
  chairImageHigh.append(highImg);
}

function bodyColorChange() {
  bodyBgColor.classList.add(`changed`);
}

function highImgPromise(file, className) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(paintHighImage(file, className));
    }, 50);
  });
}

function handleHighImageFadeIn() {
  chairImageLow.classList.add(`fadeOut`);
  chairImageHigh.classList.add(`fadeIn`);
  chairImageHigh.Image;
  bodyColorChange();
}

async function asyncLoadHighImage(file, className) {
  projectorAnimation();
  await highImgPromise(file, className);
  handleHighImageFadeIn();
}

function chairAnimation(
  lowFilePath,
  lowFileClassName,
  highFilePath,
  highFileClassName
) {
  paintLowImage(lowFilePath, lowFileClassName);
  asyncLoadHighImage(highFilePath, highFileClassName);
}

function remove() {
  chairImageHigh.querySelector(`img`).remove();
  chairImageLow.querySelector(`img`).remove();
}

function imgFadeRemove() {
  projectorAnimationRemove();
  bodyBgColor.classList.remove(`changed`);
  chairImageLow.classList.remove(`fadeOut`);
  chairImageHigh.classList.remove(`fadeIn`);
  void bodyBgColor.offsetWidth;
}

function imgClassRemove() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(imgFadeRemove());
    }, 100);
  });
}

async function fadeChange() {
  await imgClassRemove();
  projectorAnimation();
  handleHighImageFadeIn();
}

export { chairAnimation, chairImageHigh, remove, fadeChange };
