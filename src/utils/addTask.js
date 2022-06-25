import { getDate } from "./getDate";
import { updateScreen } from "./updateScreen";

export const addTask = (user) => {
  const addTaskBox = document.getElementById("js-add-task-box");
  let textData = document.getElementById("js-text");
  let dateData = document.getElementById("js-date");

  let text = textData.value;
  let date = dateData.value;

  if (!text || !date) {
    return alert("Lütfen tüm alanları doldurunuz!");
  }

  const finalDate = getDate(date);

  if (!finalDate) {
    return;
  }

  let response = user.list.find((item) => item.id === finalDate);

  if (!response) {
    const date = {
      id: finalDate,
      tasks: [],
    };
    user.list.push(date);
  }

  let oldDate = user.list.find((item) => item.id === finalDate);
  if (oldDate) {
    const newTask = {
      id: new Date().getTime(),
      text: text,
      isDone: false,
    };
    oldDate.tasks.push(newTask);
  }
  localStorage.setItem(user.username, JSON.stringify(user));
  user = JSON.parse(localStorage.getItem(user.username));
  updateScreen(user);

  document.getElementById("js-text").value = "";
  document.getElementById("js-date").value = "";
  addTaskBox.style.display = "none";
  return;
};
