import { chairAnimation, chairImageHigh, remove } from "./practice.js";

const phoneMode = window.matchMedia("(max-width: 439.9px)"),
  transverseMode = window.matchMedia("(max-height: 500px)"),
  // mobile
  tabletMode = window.matchMedia("(min-width: 440px) and (max-width: 768px)"),
  //tablet
  ipadMode = window.matchMedia("(min-width: 768px) and (max-width:1024px)"),
  // ipad
  pcMode = window.matchMedia("(min-width: 1024px)");
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
/*console.log(phoneMode, tabletMode, ipadMode);
  console.log(JSON.stringify(bodyBgColor.classList));*/

function handleMode() {
  if (
    (tabletMode.matches && ipadMode.matches) ||
    (ipadMode.matches && pcMode.matches)
  ) {
    if (chairImageHigh.querySelector(`img`) === null) {
      chairAnimation(
        `img/chair_blue.gif`,
        `bg-chair`,
        `img/chair_black.gif`,
        `bg-chair`
      );
    } else {
      remove();
      chairAnimation(
        `img/chair_blue.gif`,
        `bg-chair`,
        `img/chair_black.gif`,
        `bg-chair`
      );
    }
  } else if (phoneMode.matches) {
    remove();
    chairAnimation(
      `img/chair_blue.gif`,
      `bg-chair__phone`,
      `img/chair_black.gif`,
      `bg-chair__phone`
    );
  }
}

function modeChanged() {
  window.addEventListener("resize", handleMode);
  /*console.log(ipadMode.matches);*/
}

function refresh() {
  console.log(ipadMode.matches && transverseMode.matches);
  if (phoneMode.matches) {
    chairAnimation(
      `img/chair_blue.gif`,
      `bg-chair__phone`,
      `img/chair_black.gif`,
      `bg-chair__phone`
    );
  } else if (ipadMode.matches && transverseMode.matches) {
    chairAnimation(
      `img/chair_blue.gif`,
      `bg-chair__phone`,
      `img/chair_black.gif`,
      `bg-chair__phone`
    );
  } else {
    chairAnimation(
      `img/chair_blue.gif`,
      `bg-chair`,
      `img/chair_black.gif`,
      `bg-chair`
    );
  }
}
/*
function handlePhoneModeOrientation() {
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

function handleIpadOrientation() {
  if (ipadMode.matches) {
    chairAnimation(
      `img/chair_blue.gif`,
      `bg-chair`,
      `img/chair_black.gif`,
      `bg-chair`
    );
  } else {
    remove();
  }
}

function orientatePhone() {
  window.addEventListener(
    "orientationchange",
    handlePhoneMode,
    handleIpadOrientation
  );
} */

function handle() {
  modeChanged();
  refresh();
  //orientatePhone();
}

export { handle };
