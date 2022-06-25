import { addTask } from "./src/utils/addTask";
import { updateScreen } from "./src/utils/updateScreen";

// Page
const loginPage = document.getElementById("js-login-page");
const mainPage = document.getElementById("js-main-page");

// Buttons
const loginButton = document.getElementById("js-login");
const newTaskButton = document.getElementById("js-new-task-btn");
const cancelButton = document.getElementById("js-cancel");
const saveButton = document.getElementById("js-save");

// Inputs
let usernameData = document.getElementById("js-username-data");
const addTaskBox = document.getElementById("js-add-task-box");

let user;

// LOGIN
// ---------------------------------------------
loginButton.addEventListener("click", () => {
  if (!usernameData.value) {
    return alert("Kullanıcı adı giriniz!");
  }
  let url = window.location + usernameData.value;
  window.history.pushState({}, "", url);
  let username = usernameData.value;
  if (!JSON.parse(localStorage.getItem(username))) {
    let newUser = {
      username,
      list: [],
    };
    localStorage.setItem(username, JSON.stringify(newUser));
    user = JSON.parse(localStorage.getItem(username));
  } else {
    user = JSON.parse(localStorage.getItem(username));
  }
  usernameData.value = "";
  loginPage.classList.add("invis");
  mainPage.classList.remove("invis");

  updateScreen(user);
});

// NEW TASK
// ---------------------------------------------
newTaskButton.addEventListener("click", () => {
  addTaskBox.style.display = "flex";
  user = JSON.parse(localStorage.getItem(user.username));
  updateScreen(user);
  return;
});

cancelButton.addEventListener("click", () => {
  addTaskBox.style.display = "none";
  return;
});

saveButton.addEventListener("click", () => {
  addTask(user);
});

// CHECKING
// ---------------------------------------------
window.addEventListener("load", (event) => {
  let checkUsername = window.location.pathname.split("/")[1];
  let checkUser = JSON.parse(localStorage.getItem(checkUsername));
  if (checkUser === null) {
    mainPage.classList.add("invis");
    loginPage.classList.remove("invis");
    window.history.pushState({}, "", "/");
    return;
  }

  loginPage.classList.add("invis");
  mainPage.classList.remove("invis");
  user = checkUser;
  updateScreen(user);
});
