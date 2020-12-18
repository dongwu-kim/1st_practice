const body = document.querySelector("body");

const imgNumber = 5;

/*function handleImageLoad() {
  console.log("finished loading");
}*/

function printImage(imgNumber) {
  const image = new Image();
  image.src = `img/${imgNumber + 1}.jpg`;
  body.prepend(image);
  image.classList.add(`bgImage`);
  //image.addEventListener("loadend", handleImageLoad);
}

function getRandom() {
  const number = Math.floor(Math.random() * imgNumber);
  return number;
}

function init() {
  const randomNumber = getRandom();
  printImage(randomNumber);
}

init();
