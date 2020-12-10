const toDoForm = document.querySelector(".js-toDoForm"),
  toDoinput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const toDos_LS = "toDos";

let toDos = [];
//toDos will has changed, so we define let.

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    console.log(toDo.id, li.id);
    // li.id was string, toDo.id was number, so we parse li.id
    return toDo.id !== JSON.parse(li.id);
    /* only delete the same value 
     if you select the button of number 2, retrun number 1, 3, 4 button 
     has same id button will delete */
  });
  toDos = cleanToDos;
  //toDos changed, and we change variable type to let from const
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(toDos_LS, JSON.stringify(toDos));
}

function printToDo(text) {
  const newID = toDos.length + 1;
  //just simplify code 😂😂
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  delBtn.innerText = "✌";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  // create html elements as list, button, span
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newID;
  toDoList.appendChild(li);
  // append some created elements in html unordered list
  const toDoobj = {
    text: text,
    id: newID,
  };
  toDos.push(toDoobj);
  saveToDos();
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const toDoValue = toDoinput.value;
  printToDo(toDoValue);
  toDoinput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(toDos_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      printToDo(toDo.text);
    });
  } else {
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleToDoSubmit);
}

init();
