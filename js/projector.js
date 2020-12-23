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
function projectorInit() {
  const projector = [
    {
      container: {
        project: document.querySelector(`.project1`),
        btn: document.querySelector(`.project1-btn`),
        text: document.querySelector(`.project1-text`),
      },
    },
    {
      container: {
        project: document.querySelector(`.project2`),
        btn: document.querySelector(`.project2-btn`),
        text: document.querySelector(`.project2-text`),
      },
    },
    {
      container: {
        project: document.querySelector(`.project3`),
        btn: document.querySelector(`.project3-btn`),
        text: document.querySelector(`.project3-text`),
      },
    },
    {
      container: {
        project: document.querySelector(`.project4`),
        btn: document.querySelector(`.project4-btn`),
        text: document.querySelector(`.project4-text`),
      },
    },
  ];

  const setDelay = (ms) => new Promise((res) => setTimeout(res, ms));

  async function slideControl() {
    await setDelay(3000);
    const firstProject = document.querySelector(`.project0`);
    firstProject.style.display = `none`;
    firstProject.classList.add(`fadeOut`);

    for (let i = 0; i <= projector.length; i++) {
      if (i === projector.length) {
        i = 0;
        projector[projector.length - 1].container.project.style.display = `none`;
      }
      if (i > 0) {
        projector[i - 1].container.project.style.display = `none`;
        //projector[i - 1].container.project.classList.remove(`fadeIn`);
      }
      /*if (i === projector.length) {
        project[i].container.project.setAttribute(`aria-hidden`, true);
      }*/
      projector[i].container.project.style.display = `flex`;
      projector[i].container.project.style.opacity = 1;
      projector[i].container.btn.style.opacity = 1;
      projector[i].container.text.style.opacity = 1;
      //projector[i].container.project.classList.add(`fadeIn`);
      await setDelay(5000);
    }
  }
  slideControl();
}

export { projectorAnimation, projectorAnimationRemove, projectorInit };
