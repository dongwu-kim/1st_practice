let yOffset = 0;
let prevScrollHeight = 0; // 현재 yOffset보다 이전에 위치한 섹션들의 height 합
let currntScene = 0; // 현재 활성화된 scroll-section

function scrollLoop() {
  console.log(prevScrollHeight);
}

function scrollEvent() {
  window.addEventListener(`scroll`, () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });
}

export { scrollEvent };
