const chairImageLow = document.querySelector(".index-main__chair-low"),
  chairImageHigh = document.querySelector(".index-main__chair-high"),
  bodyBgColor = document.querySelector("body");

function paintLowImage(file) {
  const lowImg = new Image();
  lowImg.src = file;
  chairImageLow.append(lowImg);
  lowImg.classList.add(`bg-chair`);
}

function paintHighImage(file) {
  const highImg = new Image();
  highImg.src = file;
  highImg.classList.add(`bg-chair`);
  chairImageHigh.append(highImg);
}

function bodyColorChange() {
  bodyBgColor.classList.add(`changed`);
}

function highImgPromise(file) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(paintHighImage(file));
    }, 500);
  });
}

function handleHighImageFadeIn() {
  chairImageLow.classList.add(`fadeout`);
  chairImageHigh.classList.add(`fadein`);
  chairImageHigh.Image;
  bodyColorChange();
}

async function asyncLoadHighImage(file) {
  await highImgPromise(file);
  handleHighImageFadeIn();
}

function chairAnimation(lowFilePath, highFilePath) {
  paintLowImage(lowFilePath);
  asyncLoadHighImage(highFilePath);
}

export { chairAnimation, chairImageHigh };
