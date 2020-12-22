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
        messageA_fade_out: [1, 0, { start: 0.25, end: 0.3 }],
        messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
        messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
        messageB_fade_in: [0, 1, { start: 0.3, end: 0.4 }],
      },
    },

    {
      //1
      type: `normal`,
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector(`.section1`),
      },
    },

    {
      //2
      type: `sticky`,
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector(`.section2`),
      },
    },

    {
      //3
      type: `sticky`,
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector(`.section3`),
      },
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
        const messageA_fade_in = calcValues(values.messageA_fade_in, currentYOffset);
        const messageA_fade_out = calcValues(values.messageA_fade_out, currentYOffset);
        const messageA_translateY_in = calcValues(values.messageA_translateY_in, currentYOffset);
        const messageA_translateY_out = calcValues(values.messageA_translateY_out, currentYOffset);
        if (scrollRatio <= 0.22) {
          objs.messageA.style.opacity = messageA_fade_in;
          objs.messageA.style.transform = `translateY(${messageA_translateY_in}%)`;
        } else {
          objs.messageA.style.opacity = messageA_fade_out;
          objs.messageA.style.transform = `translateY(${messageA_translateY_out}%)`;
        }
        console.log(currentYOffset);
        console.log(calcValues(values.messageA_fade_out, currentYOffset));

        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
    }
  }

  function setLayout() {
    for (let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }
    let totalScrollHeight = 0;
    yOffset = window.pageYOffset;
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
