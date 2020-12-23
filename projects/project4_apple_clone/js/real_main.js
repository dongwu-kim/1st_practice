(() => {
  let yOffset = 0,
    prevScrollHeight = 0,
    currentScene = 0,
    enterNewScene = true;
  const sceneInfo = [
    {
      //0
      type: `sticky`,
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector(`.section0`),
        messageA: document.querySelector(`.section0-main__message--a`),
        messageB: document.querySelector(`.section0-main__message--b`),
        messageC: document.querySelector(`.section0-main__message--c`),
        messageD: document.querySelector(`.section0-main__message--d`),
      },
      values: {
        messageA_fade_in: [0, 1, { start: 0.1, end: 0.2 }],
        messageB_fade_in: [0, 1, { start: 0.3, end: 0.4 }],
        messageC_fade_in: [0, 1, { start: 0.5, end: 0.6 }],
        messageD_fade_in: [0, 1, { start: 0.7, end: 0.8 }],
        messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
        messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
        messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
        messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
        messageA_fade_out: [1, 0, { start: 0.25, end: 0.3 }],
        messageB_fade_out: [1, 0, { start: 0.45, end: 0.5 }],
        messageC_fade_out: [1, 0, { start: 0.65, end: 0.7 }],
        messageD_fade_out: [1, 0, { start: 0.85, end: 0.9 }],
        messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
        messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
        messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
        messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
      },
    },

    {
      //1
      type: `normal`,
      //heightNum: 5, 노말은 기본 높이가 default
      scrollHeight: 0,
      objs: {
        container: document.querySelector(`.section1`),
        content: document.querySelector(`.section1__description`),
      },
    },

    {
      //2
      type: `sticky`,
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector(`.section2`),
        messageA: document.querySelector(`.section2-main__message--a`),
        messageB: document.querySelector(`.section2-desc__message--a`),
        messageC: document.querySelector(`.section2-desc__message--b`),
        pinA: document.querySelector(`.pin--a`),
        pinB: document.querySelector(`.pin--b`),
      },
      values: {
        messageA_fade_in: [0, 1, { start: 0.25, end: 0.3 }],
        messageB_fade_in: [0, 1, { start: 0.6, end: 0.65 }],
        messageC_fade_in: [0, 1, { start: 0.87, end: 0.92 }],
        messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
        messageB_translateY_in: [20, 0, { start: 0.6, end: 0.65 }],
        messageC_translateY_in: [20, 0, { start: 0.87, end: 0.92 }],
        messageA_fade_out: [1, 0, { start: 0.4, end: 0.45 }],
        messageB_fade_out: [1, 0, { start: 0.68, end: 0.73 }],
        messageC_fade_out: [1, 0, { start: 0.95, end: 1 }],
        messageA_translateY_out: [0, -20, { start: 0.4, end: 0.45 }],
        messageB_translateY_out: [0, -20, { start: 0.68, end: 0.73 }],
        messageC_translateY_out: [0, -20, { start: 0.95, end: 1 }],
        pinA_scaleY: [0.5, 1, { start: 0.6, end: 0.65 }],
        pinB_scaleY: [0.5, 1, { start: 0.87, end: 0.92 }],
      },
    },

    {
      //3
      type: `sticky`,
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector(`.section3`),
        canvasCaption: document.querySelector(`.canvas__caption`),
      },
      values: {},
    },
  ];

  function calcValues(values, currentYOffset) {
    let rv;
    const scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    if (values.length === 3) {
      const partScrollStart = values[2].start * scrollHeight;
      const partScrollEnd = values[2].end * scrollHeight;
      const partScrollHeight = partScrollEnd - partScrollStart;

      if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
        rv =
          ((currentYOffset - partScrollStart) / partScrollHeight) * (values[1] - values[0]) +
          values[0];
        // [{partScrollRatio(현재 - 초기값) / (종결값 - 초기값)} * (애니메이션 변수 종결값 - 초기값)] + 초기값
        console.log(rv);
      } else if (currentYOffset < partScrollStart) {
        rv = values[0]; //before
      } else if (currentYOffset > partScrollEnd) {
        rv = values[1]; //forwards
      }
    } else {
      rv = scrollRatio * (values[1] - values[0]) + values[0];
    }

    return rv;
  }

  function playAnimation() {
    const objs = sceneInfo[currentScene].objs,
      values = sceneInfo[currentScene].values,
      currentYOffset = yOffset - prevScrollHeight,
      scrollHeight = sceneInfo[currentScene].scrollHeight,
      scrollRatio = currentYOffset / scrollHeight;

    switch (currentScene) {
      case 0:
        if (scrollRatio <= 0.22) {
          objs.messageA.style.opacity = calcValues(values.messageA_fade_in, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          objs.messageA.style.opacity = calcValues(values.messageA_fade_out, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_out,
            currentYOffset
          )}%, 0)`;
        }
        if (scrollRatio <= 0.42) {
          objs.messageB.style.opacity = calcValues(values.messageB_fade_in, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          objs.messageB.style.opacity = calcValues(values.messageB_fade_out, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_out,
            currentYOffset
          )}%, 0)`;
        }
        if (scrollRatio <= 0.62) {
          objs.messageC.style.opacity = calcValues(values.messageC_fade_in, currentYOffset);
          objs.messageC.style.transform = `translate3d(0, ${calcValues(
            values.messageC_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          objs.messageC.style.opacity = calcValues(values.messageC_fade_out, currentYOffset);
          objs.messageC.style.transform = `translate3d(0, ${calcValues(
            values.messageC_translateY_out,
            currentYOffset
          )}%, 0)`;
        }
        if (scrollRatio <= 0.82) {
          objs.messageD.style.opacity = calcValues(values.messageD_fade_in, currentYOffset);
          objs.messageD.style.transform = `translate3d(0, ${calcValues(
            values.messageD_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          objs.messageD.style.opacity = calcValues(values.messageD_fade_out, currentYOffset);
          objs.messageD.style.transform = `translate3d(0, ${calcValues(
            values.messageD_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        break;

      case 2:
        if (scrollRatio <= 0.32) {
          objs.messageA.style.opacity = calcValues(values.messageA_fade_in, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          objs.messageA.style.opacity = calcValues(values.messageA_fade_out, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_out,
            currentYOffset
          )}%, 0)`;
        }
        if (scrollRatio <= 0.67) {
          objs.messageB.style.opacity = calcValues(values.messageB_fade_in, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_in,
            currentYOffset
          )}%, 0)`;
          objs.pinA.style.transform = `scaleY(${calcValues(values.pinA_scaleY, currentYOffset)})`;
        } else {
          objs.messageB.style.opacity = calcValues(values.messageB_fade_out, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_out,
            currentYOffset
          )}%, 0)`;
          objs.pinA.style.transform = `scaleY(${calcValues(values.pinA_scaleY, currentYOffset)})`;
        }
        if (scrollRatio <= 0.93) {
          objs.messageC.style.opacity = calcValues(values.messageC_fade_in, currentYOffset);
          objs.messageC.style.transform = `translate3d(0, ${calcValues(
            values.messageC_translateY_in,
            currentYOffset
          )}%, 0)`;
          objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
        } else {
          objs.messageC.style.opacity = calcValues(values.messageC_fade_out, currentYOffset);
          objs.messageC.style.transform = `translate3d(0, ${calcValues(
            values.messageC_translateY_out,
            currentYOffset
          )}%, 0)`;
          objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
        }
        break;
      case 3:
        break;
    }
  }

  function setLayout() {
    for (let i = 0; i < sceneInfo.length; i++) {
      if (sceneInfo[i].type === `sticky`) {
        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      } else if (sceneInfo[i].type === `normal`) {
        sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
      }
      sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }

    yOffset = window.pageYOffset;
    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }
    document.body.setAttribute(`id`, `js-scene${currentScene}`);
  }

  function scrollLoop() {
    enterNewScene = false;
    prevScrollHeight = 0;
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      enterNewScene = true;
      currentScene++;
    }

    if (yOffset < prevScrollHeight) {
      if (currentScene === 0) return;
      enterNewScene = true;
      currentScene--;
    }

    if (enterNewScene) return;

    document.body.setAttribute(`id`, `js-scene${currentScene}`);

    playAnimation();
  }
  window.addEventListener(`resize`, setLayout);
  window.addEventListener(`load`, setLayout);
  window.addEventListener(`scroll`, () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });
})();
