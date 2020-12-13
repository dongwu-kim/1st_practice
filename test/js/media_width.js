import { chairAnimation } from "./chairAnimation.js";

const phoneMode = window.matchMedia("(max-width: 439.9px)"),
  // mobile
  tabletMode = window.matchMedia("(min-width: 440px) and (max-width: 767.9px)"),
  // ipad
  pcMode = window.matchMedia("(min-width: 768px)");
// ipad pro + pc
/*
function checkBgChanged() {
  const bodyClassList = JSON.stringify(bodyBgColor.classList);

  if (!bodyClassList.includes(`changed`)) {
    
    chairAnimation();
    console.log(`no`);
  } else {
  }
} */

function divInvisible(element) {
  element.classList.add(`invisible`);
}

function divVisible(element) {
  element.classList.remove(`invisible`);
}

function handleMode() {
  chairAnimation();
}
/*console.log(phoneMode, tabletMode, pcMode);
  console.log(JSON.stringify(bodyBgColor.classList));*/

function modeChanged() {
  window.addEventListener("resize", handleMode);
  console.log(pcMode.matches);
}

export { modeChanged };
