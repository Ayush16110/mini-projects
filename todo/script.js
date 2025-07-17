document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todo-input");
    const addTaskButton = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");
    const clearAllButton = document.getElementById("clear-all-btn");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => renderTasks(task));

    addTaskButton.addEventListener("click", () => {
        const taskText = todoInput.value.trim();
        if (taskText === "") return;

        const newTask = {
            id: Date.now(),
            text: taskText,
            isCompleted: false,
        };

        tasks.push(newTask);
        saveTasks();
        renderTasks(newTask);

        todoInput.value = ""; //clear input
        console.log(tasks);
    });

    function renderTasks(task) {
        const li = document.createElement("li");
        li.setAttribute("data-id", task.id);
        if (task.isCompleted) li.classList.add("completed");
        li.innerHTML = `
        ${task.text}
        <button>delete</button>
        `;

        li.addEventListener("click", (e) => {
            if (e.target.tagName === "BUTTON") return;

            task.isCompleted = !task.isCompleted;
            li.classList.toggle("completed");
            saveTasks();
        });

        li.querySelector("button").addEventListener("click", (e) => {
            e.stopPropagation();
            tasks = tasks.filter((t) => t.id !== task.id);
            li.remove();
            saveTasks();
        });

        todoList.appendChild(li);
    }

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    clearAllButton.addEventListener("click", () => {
        tasks = []
        saveTasks();
        todoList.innerHTML = "";
    });
});
