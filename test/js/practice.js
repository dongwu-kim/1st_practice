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
    }, 500);
  });
}

function handleHighImageFadeIn() {
  chairImageLow.classList.add(`fadeout`);
  chairImageHigh.classList.add(`fadein`);
  chairImageHigh.Image;
  bodyColorChange();
}

async function asyncLoadHighImage(file, className) {
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
  bodyBgColor.classList.remove(`changed`);
  chairImageLow.classList.remove(`fadeout`);
  chairImageHigh.classList.remove(`fadein`);
}

export { chairAnimation, chairImageHigh, remove };
