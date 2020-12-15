function divInvisible(className) {
  const div = document.querySelector(`.${className}`);
  div.classlist.add(`invisible`);
}

function divVisible(className) {
  const div = document.querySelector(`.${className}`);
  div.classlist.add(`visible`);
}

function DOM_check(arrName) {
  console.log(arrName);
}

export { divInvisible, divVisible, DOM_check };
