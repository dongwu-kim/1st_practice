import {
  bodyBgColor,
  chairAnimation,
  divInvisible,
  divVisible,
} from "./chairAnimation.js";

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

function handleMode() {
  if (phoneMode.matches) {
    divInvisible();
  } else if (tabletMode.matches) {
    divVisible();
    chairAnimation();
  } else if (pcMode.matches) {
    divVisible();
    chairAnimation();
  }
  /*console.log(phoneMode, tabletMode, pcMode);
  console.log(JSON.stringify(bodyBgColor.classList));*/
}

function modeChanged() {
  window.addEventListener("resize", handleMode);
  console.log(pcMode.matches);
}

export { modeChanged };
