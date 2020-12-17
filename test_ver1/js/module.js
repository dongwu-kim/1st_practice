import { handlechairAnimation } from "./media_width.js";
import { checkFunction } from "./projector.js";

function init() {
  handlechairAnimation();
  checkFunction(`.project`);
}

init();
