const canvas = document.getElementById(`tetris`);
const ctx = canvas.getContext(`2d`);

const tetrominos = [
    [0x4640, 0x0e40, 0x4c40, 0x4e00], //t
    [0x6c00, 0x8c40, 0x6c00, 0x8c40], //s
    [0xc600, 0x4c80, 0xc600, 0x4c80], //z
    [0x8e00, 0xc880, 0xe200, 0x44c0], //j
    [0x88c0, 0xe800, 0xc440, 0x4e00], //L
    [0x8888, 0xf000, 0x8888, 0xf000], //I
    [0xcc00, 0xcc00, 0xcc00, 0xcc00], //0
  ],
  colorList = [`#003fff`, `#61daee`, `#00ff11`, `#8c00ff`, `#ff0000`, `#ffd400`, `#ffff00`];

const curShapeType = Math.floor(Math.random() * 7),
  curRotation = 0,
  curShape = tetrominos[curShapeType][curRotation];

console.log(curShapeType, curRotation, curShape.toString(16));

let sPos = { x: 3, y: 0 },
  gamePanel = [],
  gamePanelColor = [];

for (let i = 0; i < 20; i++) {
  gamePanel[i] = [];
  gamePanelColor[i] = [];
  for (let j = 0; j < 10; j++) {
    gamePanel[i][j] = 0;
    gamePanelColor[i][j] = "white";
  }
} // game Panel create 1 row = {0,0,0,0,0,0,0,0,0,0} 20 cols
// i = cols num, j = rows num

function gamePanelSave(x, y) {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      console.log(i * 4 * j);
      if (curShape & (0x8000 >> (i * 4 * j))) {
        // 비트 AND -> & Right shift -> >>
        this.gamePanel[this.sPos.y + i][this.sPos.x + j] = 1;
        this.gamePanelColor[this.sPos.y + i][this.sPos.x + j] = colorList[curShapeType];
      }
    }
  }
} // 아직 잘 모르는 part

function gamePanelDraw() {
  ctx.fillStyle = `white`;
  ctx.fillRect(0, 0, 200, 400);
  ctx.fillStyle = `black`;
  for (let i = 0; i < gamePanel.length; i++) {
    for (let j = 0; j < gamePanel[i].length; j++) {
      if (gamePanel[i][j]) {
        ctx.fillStyle = gamePanelColor[i][j];
        ctx.fillRect(x * 20, y * 20, 19, 19);
      }
    }
  }
}

function draw() {
  gamePanelDraw();

  for (i = 0; i < 4; i++) {
    for (j = 0; j < 4; j++) {
      if (curShape & (0x8000 >> (i * 4 * j))) {
        ctx.fillStyle = this.colorList[this.curShapeType];
        ctx.fillRect((sPos.x + j) * 20, (sPos.y + i) * 20, 19, 19);
      }
    }
  }
}

function gamefinished() {
  clearInterval(intervalHandler);
  location.reload();
  alert(setpoint + "점 입니다.");
}

function newShape() {
  if (
    gamePanel[0][3] == 1 ||
    gamePanel[0][4] == 1 ||
    gamePanel[0][5] == 1 ||
    gamePanel[0][6] == 1
  ) {
    gamefinished();
  }
  let shapeNum = Math.floor(Math.random() * 7);
  this.sPos.x = 3;
  this.sPos.y = 0;
  this.curShapeType = shapeNum;
  this.curShape = tetrominos[curShapeType][curRotation];
  draw();
}

function changeAng() {
  if (this.curRotation == 3) {
    this.curRotation = 0;
  } else {
    this.curRotation += 1;
  }
  this.curShape = tetrominos[curShapeType][curRotation];
  draw();
}

function handledKeydown(event) {
  switch (event.keyCode) {
    case 37:
      if (rowLeftCheck()) {
        sPos.x -= 1;
      } else {
      }
      draw();
      break;
    case 39:
      if (rowRightCheck()) {
        sPos.x += 1;
      } else {
      }
      draw();
      break;
    case 38:
      if (checkAng(tetrominos[curShapeType][curRotation + 1])) {
        changeAng();
      } else {
      }
      draw();
      break;
    case 32:
      break;
    default:
      break;
  }
}

function rowLeftCheck() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (curShape & (0x8000 >> (i * 4 * j))) {
        if (this.sPos.x + j - 1 == -1 || gamePanel[this.sPos.y + i][this.sPos.x + j - 1]) {
          return false;
        }
      }
    }
  }
  return true;
}

function rowRightCheck() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (curShape & (0x8000 >> (i * 4 * j))) {
        if (this.sPos.x + j + 1 == 10 || gamePanel[this.sPos.y + i][this.sPos.x + j + 1]) {
          return false;
        }
      }
    }
  }
  return true;
}

function checkBlock(x, y) {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (curShape & (0x8000 >> (i * 4 * j))) {
        if (y + i >= 19 || gamePanel[y + i + 1][x + j]) {
          return false;
        }
      }
    }
  }
  return true;
}

function checkAng(tetromino) {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (tetromino & (0x8000 >> (i * 4 * j))) {
        if (gamePanel[this.sPos.y + i][this.sPos.x + j]) {
          return false;
        }
      }
    }
  }
}

function checkLastRow() {
  let xList = [];
  for (let i = gamePanel.length - 1; i >= 0; y--) {
    let ck = 0;
    for (let j = gamePanel[i].length - 1; j >= 0; j--) {
      ck += gamePanel[i][j];
    }
    if (ck == 10) {
      xList.push(i);
    }
  }
  dropBlock(xList);
  return 1;
}

function dropBlock(){
    let pointCnt = 0;
    for(let i = 0 ; i <xList.length; )
}