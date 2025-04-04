document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    addTaskBtn.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            const li = document.createElement("li");
            li.innerHTML = `${taskText} <span class="delete">×</span>`;
            taskList.appendChild(li);
            taskInput.value = "";
            taskInput.focus();
        }
    });

    taskList.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete")) {
            e.target.parentElement.remove();
        }
    });
});
