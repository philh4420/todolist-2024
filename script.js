document.addEventListener("DOMContentLoaded", function () {
  var savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  renderTasks(savedTasks);

  function renderTasks(tasks) {
    var taskList = document.getElementById("taskList");
    taskList.innerHTML = '';
    tasks.forEach(function (task) {
      var li = document.createElement("li");
      li.classList.add("task-item");
      li.innerHTML = `<span class="task-name">${task.text}</span>
                            <span class="priority">${task.priority}</span>
                            <span class="due-date">${task.dueDate}</span>
                            <span class="category">${task.category}</span>
                            <button class="edit-btn">Edit</button>
                            <button class="delete-btn">Delete</button>`;
      taskList.appendChild(li);
    });
  }

  function updateLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  document.getElementById("addTaskBtn").addEventListener("click", function () {
    var input = document.getElementById("taskInput").value.trim();
    if (input !== '') {
      var priority = document.getElementById("prioritySelect").value;
      var dueDate = document.getElementById("dueDateInput").value;
      var category = document.getElementById("categorySelect").value;
      var task = { text: input, priority: priority, dueDate: dueDate, category: category };
      savedTasks.push(task);
      updateLocalStorage(savedTasks);
      renderTasks(savedTasks);
      document.getElementById("taskInput").value = '';
    } else {
      alert("Please enter a task!");
    }
  });

  document.getElementById("taskList").addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-btn")) {
      var index = Array.from(event.target.parentNode.parentNode.children).indexOf(event.target.parentNode);
      savedTasks.splice(index, 1);
      updateLocalStorage(savedTasks);
      renderTasks(savedTasks);
    }
    if (event.target.classList.contains("edit-btn")) {
      var index = Array.from(event.target.parentNode.parentNode.children).indexOf(event.target.parentNode);
      var newText = prompt("Enter new task text:", savedTasks[index].text);
      if (newText !== null && newText.trim() !== '') {
        savedTasks[index].text = newText;
        updateLocalStorage(savedTasks);
        renderTasks(savedTasks);
      }
    }
  });

  document.getElementById("clearCompletedBtn").addEventListener("click", function () {
    savedTasks = savedTasks.filter(function (task) {
      return !task.completed;
    });
    updateLocalStorage(savedTasks);
    renderTasks(savedTasks);
  });

  document.getElementById("toggleDarkModeBtn").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
  });

  document.getElementById("filterSelect").addEventListener("change", function () {
    var filter = document.getElementById("filterSelect").value;
    if (filter === "all") {
      renderTasks(savedTasks);
    } else {
      var filteredTasks = savedTasks.filter(function (task) {
        return task.priority === filter;
      });
      renderTasks(filteredTasks);
    }
  });

  document.getElementById("searchInput").addEventListener("input", function () {
    var searchTerm = document.getElementById("searchInput").value.toLowerCase();
    var filteredTasks = savedTasks.filter(function (task) {
      return task.text.toLowerCase().includes(searchTerm);
    });
    renderTasks(filteredTasks);
  });

});
