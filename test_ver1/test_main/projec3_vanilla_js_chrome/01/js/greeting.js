const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings"),
  btn = document.querySelector(".js-btn");

const userNameInStorage = "userName";
//define username in user storage

const showingOn = "showing";

function saveName(text) {
  localStorage.setItem(userNameInStorage, text);
  // localstorage has 2 argument userName = storage object name, text = object value
}

function printGreeting(text) {
  greeting.innerText = `반가워요 ${text}님!`;
  form.classList.remove(showingOn);
  btn.classList.add(showingOn);
  greeting.classList.add(showingOn);
}

function handleSubmit(event) {
  event.preventDefault();
  const userNameValue = input.value;
  saveName(userNameValue);
  printGreeting(userNameValue);
}

function askName() {
  form.classList.add(showingOn);
  form.addEventListener("submit", handleSubmit);
  greeting.classList.remove(showingOn);
  greeting.innerText = "";
  btn.classList.remove(showingOn);
}

function loadName() {
  const userName = localStorage.getItem(userNameInStorage);
  if (userName === null) {
    askName();
  } else {
    printGreeting(userName);
  }
}

function handleBtnClick(event) {
  event.preventDefault();
  localStorage.removeItem(userNameInStorage);
  location.reload();
}

function rewriteBtnClick() {
  btn.addEventListener("click", handleBtnClick);
}

function init() {
  loadName();
  rewriteBtnClick();
}

init();
