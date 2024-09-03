import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["form","input","description","taskList"]

  createTask(event) {
    event.preventDefault() 
    const formData = new FormData(this.formTarget)
    fetch(this.formTarget.action, {
      method: 'POST',
      body: formData,
    })
    .then(response => response.text())
    .then(html => {
      this.taskListTarget.insertAdjacentHTML('afterbegin', html);
      this.formTarget.reset() 
    })
    .catch(error => console.error('Error:', error))
  }

  performSearch() {
    const query = this.inputTarget.value

    fetch(`/search?query=${query}`, {
      contentType: 'application/json',
      hearders: 'application/json'
    })
    .then(response => response.text())
    .then(html => {
      this.taskListTarget.innerHTML = html;
    })
    .catch(error => console.error('Error fetching tasks:', error))
  }



  destroyTask(event) {
    const taskId = event.target.dataset.tasksId;

    if (confirm('Are you sure you want to delete this task?')) {
      const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
      fetch(`/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-Token': csrfToken 
        }
      })
      .then(response => response.text())
      .then(html => {
        debugger
        this.listTarget.querySelector(`[data-tasks-id="${taskId}"]`).remove()
      })
      .catch(error => console.error('Error:', error));
    }
  }

  removeTaskFromList(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const taskToRemove = doc.querySelector('li');
    if (taskToRemove) {
      const taskId = taskToRemove.querySelector('button[data-action="click->tasks#destroyTask"]').dataset.tasksId;
      const taskElement = this.listTarget.querySelector(`#task_${taskId}`);

      if (taskElement) {
        taskElement.remove();
      }
    }
  }
}
