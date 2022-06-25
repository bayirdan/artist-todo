import { actionButtons } from "./actionButtons";

export const updateScreen = (user) => {
  const taskBox = document.getElementById("js-task-box");

  const listItem = user.list
    .map((item) => {
      return `
    <div class="date" id="${item.id}">
      <div class="date-title">  
        <img src="./src/images/calendar.svg" alt="calendar" />
        <h2 class="header-2">${item.id}</h2>
      </div>
      <div class="table">
    <ul>
    ${item.tasks
      .map((taskItem) => {
        let itemDiv = `
      <li class="item" id="${taskItem.id}">
        <div class="checkbox actions" data-action="check">
          <input class="js-checkbox" type="checkbox" name="isDone" ${
            taskItem.isDone ? "checked" : ""
          } />
        </div>
        <input value="${taskItem.text}" type="text" class="task text ${
          taskItem.isDone ? "task-done" : ""
        }" disabled data-id="${taskItem.id}">
        <div class="icon edit actions" data-action="edit">
          <img src="./src/images/edit.svg" alt="edit" />
        </div>
        <div id="js-delete" class="icon delete actions" data-action="delete">
          <img src="./src/images/delete.svg" alt="edit" />
        </div>
      </li>`;
        return itemDiv;
      })
      .join("")}
    </ul>
    </div>
    </div>
    `;
    })
    .join("");
  if (listItem.length === 0) {
    taskBox.innerHTML =
      '<h1 class="header-2" style="text-align: center">No task has been added yet!</h1>';
    return;
  }
  taskBox.innerHTML = listItem;

  actionButtons(user);
};
