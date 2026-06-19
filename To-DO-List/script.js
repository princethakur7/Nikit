let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

function addTask() {

    let taskInput = document.getElementById("taskInput");
    let priority = document.getElementById("priority");
    let dueDate = document.getElementById("dueDate");
    let category = document.getElementById("category");

    if(taskInput.value.trim() === ""){
        alert("Please enter a task");
        return;
    }

    let task = {
        id: Date.now(),
        text: taskInput.value,
        priority: priority.value,
        dueDate: dueDate.value,
        category: category.value,
        completed: false
    };

    tasks.push(task);

    saveTasks();

    taskInput.value = "";
    dueDate.value = "";

    displayTasks();
}

function displayTasks() {

    let taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach(task => {

        let card = document.createElement("div");

        card.className = task.completed
        ? "task-card completed"
        : "task-card";

        card.innerHTML = `
        
        <div class="task-info">

            <h3>${task.text}</h3>

            <div class="task-details">

                <span class="badge ${task.priority.toLowerCase()}">
                ${task.priority}
                </span>

                <span class="badge category">
                ${task.category}
                </span>

                <span class="badge date">
                ${task.dueDate || "No Date"}
                </span>

            </div>

        </div>

        <div class="task-actions">

            <button class="complete-btn"
            onclick="toggleTask(${task.id})">
            ${task.completed ? "Undo" : "Done"}
            </button>

            <button class="delete-btn"
            onclick="deleteTask(${task.id})">
            Delete
            </button>

        </div>
        `;

        taskList.appendChild(card);
    });

    updateStats();
}

function toggleTask(id){

    tasks = tasks.map(task => {

        if(task.id === id){
            task.completed = !task.completed;
        }

        return task;
    });

    saveTasks();
    displayTasks();
}

function deleteTask(id){

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();
    displayTasks();
}

function saveTasks(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

function updateStats(){

    document.getElementById("totalTasks").innerText =
    tasks.length;

    document.getElementById("completedTasks").innerText =
    tasks.filter(task => task.completed).length;
}