import React from "react";
import "./App.css";

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]; // 일종의 정답지
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]; // 해당 칸의 번호를 입력받는 과정
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
      // 여기서의 비교는 string 값의 비교가 된다. 하나의 line이 모두 같은 문자값이라면
      // 해당 문자를 다시 반화한다는 의미
    }
  }
  return null;
}

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => {
          this.props.onClick(i);
        }}
      />
    );
  }

  paintSquares(a, b) {
    let board = [];
    let list = [];
    for (let i = 0; i < a; i++) {
      for (let j = i * a; j < i * a + b; j++) {
        list.push(this.renderSquare(j));
      }
      let div = (
        <div key={`board` + i} className="board-row">
          {list}
        </div>
      );
      board.push(div);
      list = [];
    }
    return board;
  }

  render() {
    let test = this.paintSquares(3, 3);
    console.log(test);
    return (
      <div>
        <div className="status"></div>
        {test}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      xIsNext: true,
      stepNum: 0,
      rowAndCol: [],
    };
  }

  checkRowCol(num) {
    let rowNum = [];
    let colNum = [];
    let rowAndCol = [];
    let rows = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ];
    let cols = [
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];
    let col, row;

    for (let i = 0; i < 3; i++) {
      col = rows[i].indexOf(num) + 1;
      row = cols[i].indexOf(num) + 1;
      // 결과값 확인 시 정상적인 선언임을 알 수 있다.
      if (col !== 0) {
        colNum.push(col);
      }
      if (row !== 0) {
        rowNum.push(row);
      }
      rowAndCol = rowNum.concat(colNum);
    }
    return rowAndCol;
  }

  handleClick(i) {
    const rowAndCol = this.checkRowCol(i);
    const history = this.state.history.slice(0, this.state.stepNum + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    let location = this.state.rowAndCol.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    location.push(rowAndCol);
    squares[i] = this.state.xIsNext ? `X` : `O`;
    this.setState({
      history: history.concat([{ squares: squares }]),
      xIsNext: !this.state.xIsNext,
      stepNum: history.length,
      rowAndCol: location,
    });
  }

  jumpTo(step) {
    this.setState({ stepNum: step, xIsNext: step % 2 === 0 });
    console.log(step);
    console.log(this.state.history[step]);
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNum];
    const winner = calculateWinner(current.squares);
    const rowAndCol = this.state.rowAndCol;

    const test = `test`;

    const moves = history.map((step, move) => {
      /*console.log(history);
      console.log(move);
      move는 map의 원형에서 index에 위치한 값입니다.*/
      const desc = move
        ? `Go to move #` +
          move +
          ` ` +
          rowAndCol[move - 1][0] +
          ` 행 ` +
          rowAndCol[move - 1][1] +
          ` 열 `
        : `Go to game start`;
      // 초기에는 move의 값이 없고, 클릭 시 생성됩니다.
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    let status;
    if (winner) {
      status = "Winner : " + winner;
    } else {
      status = "Next player : " + (this.state.xIsNext ? `X` : `O`);
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => {
              this.handleClick(i);
            }}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
          {test}
        </div>
      </div>
    );
  }
}

export default Game;
