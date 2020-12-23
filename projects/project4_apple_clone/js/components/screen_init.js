function heightMultiple(arr, num) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].heightMulNum = num;
  }
}

function addObj(arr, className) {
  for (let i = 0; i < arr.length; i++) {
    const objs = {
      container: document.querySelector(`${className + i}`),
    };
    arr[i].objs = objs;
  }
}

function setLayout(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].scrollHeight = arr[i].heightMulNum * window.innerHeight;
    arr[i].objs.container.style.height = `${arr[i].scrollHeight}px`;
  }
}
//layout generator

function screenInit(arr) {
  heightMultiple(arr, 5);
  addObj(arr, `.section`);
  setLayout(arr);
  function handleResize() {
    setLayout(arr);
  }
  window.addEventListener("resize", handleResize);
}
//initialize

export { screenInit };
