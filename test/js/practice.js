const chairImage = document.querySelector(".index-main__chair");

const lowImg = new Image();
const highImg = new Image();

function paintLowImage() {
  lowImg.src = `img/chair.gif`;
  chairImage.append(lowImg);
  lowImg.classList.add(`bg-chair__low`);
}

function paintHighImage() {
  highImg.src = `img/chair1.gif`;
  highImg.classList.add(`bg-chair__high`, `invisible`);
  chairImage.append(highImg);
}

function handleHighImageLoad() {
  lowImg.classList.add(`fadeout`);
  highImg.classList.add(`fadein`);
  highImg.classList.remove(`invisible`);
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
      }, 50);
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
