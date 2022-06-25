import { updateScreen } from "./updateScreen";

export const actionButtons = (user) => {
  const buttons = document.querySelectorAll(".actions");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      let action = btn.dataset.action;
      let parent = btn.parentElement;
      switch (action) {
        // Check
        case "check":
          let dateTasks = user.list.find((i) =>
            i.tasks.find((j) => j.id == parent.id)
          );
          dateTasks.tasks.map((item) => {
            return item.id == parent.id ? (item.isDone = !item.isDone) : item;
          });
          const index = user.list.findIndex((item) => item.id == dateTasks.id);
          user.list[index] = dateTasks;
          localStorage.setItem(user.username, JSON.stringify(user));
          user = JSON.parse(localStorage.getItem(user.username));
          updateScreen(user);
          break;
        // Delete
        case "delete":
          let parentDel = user.list.find((i) =>
            i.tasks.find((j) => j.id == parent.id)
          );
          let newTasks = parentDel.tasks.filter((item) => item.id != parent.id);
          const delIndex = user.list.findIndex(
            (item) => item.id == parentDel.id
          );
          if (newTasks.length < 1) {
            user.list.splice(delIndex, 1);
          } else {
            parentDel.tasks = newTasks;
            user.list[delIndex] = parentDel;
          }
          localStorage.setItem(user.username, JSON.stringify(user));
          user = JSON.parse(localStorage.getItem(user.username));
          updateScreen(user);
          break;

        // Edit
        case "edit":
          let parentInput = user.list.find((i) =>
            i.tasks.find((j) => j.id == parent.id)
          );
          parent.children[1].disabled = false;
          let img = parent.children[2].children[0].src.split("/").reverse()[0];
          if (img === "edit.svg") {
            parent.children[2].children[0].src = "./src/images/edit-done.svg";
          } else {
            let newValue = document.querySelector(
              `[data-id='${parent.children[1].dataset.id}']`
            ).value;
            if (newValue < 1) {
              return alert("Please add some things");
            }
            parentInput.tasks.map((item) => {
              return item.id == parent.id ? (item.text = newValue) : item;
            });
            const indexInput = user.list.findIndex(
              (item) => item.id == parentInput.id
            );
            user.list[indexInput] = parentInput;
            localStorage.setItem(user.username, JSON.stringify(user));
            user = JSON.parse(localStorage.getItem(user.username));
            updateScreen(user);
            break;
          }

        default:
          break;
      }
    });
  });
};
