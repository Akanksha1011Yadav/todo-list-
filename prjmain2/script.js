const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const errorMessage = document.getElementById("error-message");
const dateDisplay = document.getElementById("date-display");

// 1. Set Today's Date
const today = new Date();
const options = { weekday: 'long', month: 'short', day: 'numeric' };
dateDisplay.innerHTML = "Date: " + today.toLocaleDateString('en-US', options);

function addTask() {
    if (inputBox.value.trim() === '') {
        errorMessage.textContent = "Please write a task first!";
    } else {
        errorMessage.textContent = ""; 
        
        let li = document.createElement("li");

        // Task Text
        let textSpan = document.createElement("span");
        textSpan.textContent = inputBox.value;
        textSpan.classList.add("task-text");
        li.appendChild(textSpan);

        // Actions (Edit/Delete)
        let div = document.createElement("div");
        div.classList.add("task-actions");

        let editBtn = document.createElement("span");
        editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
        editBtn.classList.add("edit-btn");
        div.appendChild(editBtn);

        let deleteBtn = document.createElement("span");
        deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        deleteBtn.classList.add("delete-btn");
        div.appendChild(deleteBtn);

        li.appendChild(div);
        listContainer.appendChild(li);
    }
    inputBox.value = "";
    saveData();
}

// Event Listeners
listContainer.addEventListener("click", function(e) {
    // Click on text or LI to toggle complete
    if (e.target.tagName === "LI" || e.target.classList.contains("task-text")) {
        let targetLi = e.target.tagName === "LI" ? e.target : e.target.parentElement;
        targetLi.classList.toggle("checked");
        saveData();
    }
    // Delete
    else if (e.target.closest(".delete-btn")) {
        e.target.closest("li").remove();
        saveData();
    }
    // Edit
    else if (e.target.closest(".edit-btn")) {
        let li = e.target.closest("li");
        let textSpan = li.querySelector(".task-text");
        let newText = prompt("Update task:", textSpan.textContent);
        if (newText !== null && newText.trim() !== "") {
            textSpan.textContent = newText;
            saveData();
        }
    }
}, false);

inputBox.addEventListener("keypress", function(e) {
    if (e.key === "Enter") addTask();
});

function saveData() {
    localStorage.setItem("plannerData", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("plannerData") || "";
}

showTask();