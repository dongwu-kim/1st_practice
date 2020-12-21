(() => {
  let yOffset = 0,
    prevScrollHeight = 0,
    currentScene = 0;
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
        messageA_opacity: [0, 1],
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
    let scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;
    rv = scrollRatio * (values[1] - values[0]) + values[0];
    return rv;
  }

  function playAnimation() {
    const objs = sceneInfo[currentScene].objs,
      values = sceneInfo[currentScene].values,
      currentYOffset = yOffset - prevScrollHeight;
    switch (currentScene) {
      case 0:
        let messageA_fade_in = calcValues(values.messageA_opacity, currentYOffset);
        objs.messageA.style.opacity = messageA_fade_in;
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
    prevScrollHeight = 0;
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      currentScene++;
    }

    if (yOffset < prevScrollHeight) {
      if (currentScene === 0) return;
      currentScene--;
    }

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
