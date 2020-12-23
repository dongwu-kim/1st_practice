import { screenInit } from "./components/screen_init.js";
import { scrollEvent } from "./components/scroll_event.js";
(() => {
  const sceneInfo = [
    {
      //0
      type: `sticky`,
      heightMulNum: 0,
      scrollHeight: 0,
    },
    {
      //1
      type: `normal`,
      heightMulNum: 0,
      scrollHeight: 0,
    },
    {
      //2
      type: `sticky`,
      heightMulNum: 0,
      scrollHeight: 0,
    },
    {
      //3
      type: `sticky`,
      heightMulNum: 0,
      scrollHeight: 0,
    },
  ];
  screenInit(sceneInfo); //multiple number
  scrollEvent();
})();
