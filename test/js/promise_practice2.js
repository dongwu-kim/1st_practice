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
  return (highImgPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve(loadHighImage());
    }, 800);
  }));
}

async function asyncLoadHighImage() {
  await highImgPromise();
}

function divInvisible(element) {
  element.classList.add(`invisible`);
}

function divVisible(element) {
  element.classList.remove(`invisible`);
}

function chairAnimation() {
  paintLowImage();
  asyncLoadHighImage();
}

export { bodyBgColor, chairAnimation, divInvisible, divVisible };


function loadImage (src) {
  return new Promise((resolve, reject) => {
  const img = new Image()
  img.onload = () => resolve(img)
  img. = evt => reject(URIError(`이미지 로딩 실패 ${evt.target.src}`))
    })
  }
