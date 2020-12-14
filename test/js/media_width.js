import { chairAnimation, chairImageHigh, remove } from "./practice.js";

const phoneMode = window.matchMedia("(max-width: 439.9px)"),
  // mobile
  tabletMode = window.matchMedia("(min-width: 440px) and (max-width: 768px)"),
  // ipad
  pcMode = window.matchMedia("(min-width: 768px)");
// ipad pro + pc

/*function handleMode() {
  const ClassList = JSON.stringify(chairImageHigh.classList);
  if (ClassList.includes(`fadein`)) {
    console.log(`already changed`);
    
  } else {
    chairAnimation(
      `img/chair_blue.gif`,
      `bg-chair`,
      `img/chair_black.gif`,
      `bg-chair`
    );
  }
}*/
/*console.log(phoneMode, tabletMode, pcMode);
  console.log(JSON.stringify(bodyBgColor.classList));*/

function handleMode() {
  if (tabletMode.matches === pcMode.matches) {
    remove();
    chairAnimation(
      `img/chair_blue.gif`,
      `bg-chair`,
      `img/chair_black.gif`,
      `bg-chair`
    );
  } else if (phoneMode.matches) {
    remove();
  }
}

function modeChanged() {
  window.addEventListener("resize", handleMode);
  /*console.log(pcMode.matches);*/
}

function refresh() {
  if (phoneMode.matches) {
    console.log(`phoneMode`);
  } else {
    chairAnimation(
      `img/chair_blue.gif`,
      `bg-chair`,
      `img/chair_black.gif`,
      `bg-chair`
    );
  }
}

function handlePhoneMode() {
  if (phoneMode.matches) {
    chairAnimation(
      `img/chair_blue.gif`,
      `bg-chair__phone`,
      `img/chair_black.gif`,
      `bg-chair__phone`
    );
  } else {
    remove();
  }
}

function orientatePhone() {
  window.addEventListener("orientationchange", handlePhoneMode);
}

function handle() {
  modeChanged();
  refresh();
  orientatePhone();
}

export { handle };
