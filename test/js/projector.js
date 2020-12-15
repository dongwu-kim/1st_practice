import { checkDOM } from "./dom_control.js";

const projectContainer = document.querySelector(`.index-main__projector`),
  project = document.querySelector(`.index-main__project`),
  projectorBtn = project.querySelector(`.index-main__project-btn`),
  projectorTitle = project.querySelector(`.index-main__project-text`);

function projectorAnimation() {
  projectContainer.classList.add(`whiteToBlack`);
  project.classList.add(`projectBgAnimation`);
  projectorBtn.classList.add(`fadeIn`);
  projectorTitle.classList.add(`fadeIn`);
}

function projectorAnimationRemove() {
  {
    projectContainer.classList.remove(`whiteToBlack`);
    project.classList.remove(`projectBgAnimation`);
    projectorBtn.classList.remove(`fadeIn`);
    projectorTitle.classList.remove(`fadeIn`);
    void projectContainer.offsetWidth;
  }
}
// export to imgAnimation.js

const slideDom = { project }; // projector slides show checking
const slideArr = [];

function checkFunction(className) {
  /*for (var i = 1; i < 4; i++) {
    slideArr.push(document.querySelector(className + i));
    
  }*/
  console.log(slideArr);
}

export { projectorAnimation, projectorAnimationRemove, checkFunction };
