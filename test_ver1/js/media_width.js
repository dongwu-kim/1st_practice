import {
  chairAnimation,
  chairImageHigh,
  remove,
  fadeChange,
} from "./imgAnimation.js";

const phoneMode = window.matchMedia("(max-width: 439.9px)"),
  transverseMode = window.matchMedia("(max-height: 500px)"),
  // mobile
  tabletMode = window.matchMedia("(min-width: 440px) and (max-width: 768px)"),
  //tablet
  ipadMode = window.matchMedia("(min-width: 768px) and (max-width:1024px)"),
  // ipad
  pcMode = window.matchMedia("(min-width: 1024px)");
// ipad pro + pc

function handleMode() {
  const imgName = chairImageHigh.querySelector(`img`);
  if (phoneMode.matches || (ipadMode.matches && transverseMode.matches)) {
    if (chairImageHigh.querySelector(`img`) === null) {
      chairAnimation(
        `img/chair_blue.gif`,
        `phone-chair`,
        `img/chair_black.gif`,
        `phone-chair`
      );
    } else if (imgName.classList.contains(`pc-chair`)) {
      remove();
      chairAnimation(
        `img/chair_blue.gif`,
        `phone-chair`,
        `img/chair_black.gif`,
        `phone-chair`
      );
    }
  } else if (tabletMode.matches || ipadMode.matches || pcMode.matches) {
    if (chairImageHigh.querySelector(`img`) === null) {
      chairAnimation(
        `img/chair_blue.gif`,
        `pc-chair`,
        `img/chair_black.gif`,
        `pc-chair`
      );
    } else if (imgName.classList.contains(`phone-chair`)) {
      remove();
      chairAnimation(
        `img/chair_blue.gif`,
        `pc-chair`,
        `img/chair_black.gif`,
        `pc-chair`
      );
    }
  }
}

function modeChanged() {
  window.addEventListener("resize", handleMode);
  /*console.log(ipadMode.matches);*/
}

function deviceInitialize() {
  console.log(ipadMode.matches && transverseMode.matches);
  if (phoneMode.matches || (ipadMode.matches && transverseMode.matches)) {
    chairAnimation(
      `img/chair_blue.gif`,
      `phone-chair`,
      `img/chair_black.gif`,
      `phone-chair`
    );
  } else {
    chairAnimation(
      `img/chair_blue.gif`,
      `pc-chair`,
      `img/chair_black.gif`,
      `pc-chair`
    );
  }
}

function orientatePhone() {
  window.addEventListener("orientationchange", fadeChange);
}

function handleResizeFadeChange() {
  if (
    (tabletMode.matches && ipadMode.matches) ||
    (ipadMode.matches && pcMode.matches)
  ) {
    fadeChange();
  }
}

function resiezeFadeChange() {
  window.addEventListener("resize", handleResizeFadeChange);
}

function handlechairAnimation() {
  deviceInitialize();
  modeChanged();
  orientatePhone();
  resiezeFadeChange();
}

export { handlechairAnimation };
