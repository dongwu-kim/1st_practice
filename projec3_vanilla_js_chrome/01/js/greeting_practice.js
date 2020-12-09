const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");
// load HTML class or tag name and define some values

const showingOn = "showing";
// define HTML class

const userStorage = "userName";
// define userstorage object

function saveName(text) {
  localStorage.setItem(userStorage, text);
}

function paintGreeting(text) {
  greeting.innerText = `Hello ${text}`;
  greeting.classList.add(showingOn);
  form.classList.remove(showingOn);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.classList.add(showingOn);
  form.addEventListener("submit", handleSubmit);
}

function loadName() {
  const userName = localStorage.getItem(userStorage);
  if (userName === null) {
    // not exist username
    askForName();
  } else {
    // exist username
    paintGreeting(userName);
  }
}

function init() {
  loadName();
}

init();
