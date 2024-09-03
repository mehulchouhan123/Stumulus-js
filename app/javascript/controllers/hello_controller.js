import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    console.log("Hello, Stimulus!", this.element)
  }

  static targets = ["taskList", "taskInput"];

  addTask(event) {
    event.preventDefault();
    const taskText = this.taskInputTarget.value.trim();
    if (taskText) {
      const listItem = document.createElement("li");
      listItem.textContent = taskText;
      listItem.innerHTML += '<button data-action="click->hello#removeTask">Remove</button>';
      this.taskListTarget.appendChild(listItem);
      this.taskInputTarget.value = "";
    }
  }

  removeTask(event) {
    event.preventDefault();
    event.target.closest("li").remove();
  }
}

