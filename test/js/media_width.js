import { chairAnimation, chairImageHigh } from "./practice.js";

const phoneMode = window.matchMedia("(max-width: 439.9px)"),
  // mobile
  tabletMode = window.matchMedia("(min-width: 440px) and (max-width: 767.9px)"),
  // ipad
  pcMode = window.matchMedia("(min-width: 768px)");
// ipad pro + pc

function handleMode() {
  const ClassList = JSON.stringify(chairImageHigh.classList);
  if (ClassList.includes(`fadein`)) {
    console.log(`already changed`);
  } else {
    chairAnimation(`img/chair_blue.gif`, `img/chair_black.gif`);
  }
}
/*console.log(phoneMode, tabletMode, pcMode);
  console.log(JSON.stringify(bodyBgColor.classList));*/

function modeChanged() {
  window.addEventListener("resize", handleMode);
  /*console.log(pcMode.matches);*/
}

function refresh() {
  if (phoneMode.matches) {
    return 0;
  } else {
    chairAnimation(`img/chair_blue.gif`, `img/chair_black.gif`);
  }
}

function handle() {
  modeChanged();
  refresh();
}

export { handle };
