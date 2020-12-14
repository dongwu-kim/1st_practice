const projectContainer = document.querySelector(`.index-main__projector`),
  project = document.querySelector(`.index-main__project`),
  projectorBtn = document.querySelector(`.index-main__project-btn-img`),
  projectorText = document.querySelector(`.index-main__project-text-title`);

function projectorAnimation() {
  console.log(projectorText, projectorBtn);
  projectContainer.classList.add(`whiteToBlack`);
  project.classList.add(`projectBgAnimation`);
  projectorBtn.classList.add(`fadeIn`);
  projectorText.classList.add(`fadeIn`);
}
export { projectorAnimation };
