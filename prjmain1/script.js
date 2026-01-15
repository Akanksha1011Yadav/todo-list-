const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const errorMessage = document.getElementById("error-message");

// Function to Add Task
function addTask() {
    // 1. Validation: Check if input is empty
    if (inputBox.value.trim() === '') {
        errorMessage.textContent = "You must write something!";
        return;
    } else {
        errorMessage.textContent = ""; // Clear error
    }

    // 2. Create List Item
    let li = document.createElement("li");
    
    // Create text node for the task
    let textSpan = document.createElement("span");
    textSpan.textContent = inputBox.value;
    textSpan.classList.add("task-text");
    li.appendChild(textSpan);

    // 3. Create Action Buttons (Edit & Delete)
    let div = document.createElement("div");
    div.classList.add("task-actions");

    // Edit Button
    let editBtn = document.createElement("span");
    editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    editBtn.classList.add("edit-btn");
    div.appendChild(editBtn);

    // Delete Button
    let deleteBtn = document.createElement("span");
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteBtn.classList.add("delete-btn");
    div.appendChild(deleteBtn);

    li.appendChild(div);
    listContainer.appendChild(li);

    // 4. Clear Input and Save
    inputBox.value = "";
    saveData();
}

// Event Listener for the List Container (Event Delegation)
listContainer.addEventListener("click", function(e) {
    
    // Toggle Checked (Complete/Incomplete)
    if (e.target.tagName === "LI" || e.target.classList.contains("task-text")) {
        // Find the parent LI if the click hit the text span
        let targetLi = e.target.tagName === "LI" ? e.target : e.target.parentElement;
        targetLi.classList.toggle("checked");
        saveData();
    }
    
    // Delete Task
    else if (e.target.closest(".delete-btn")) {
        e.target.closest("li").remove();
        saveData();
    }

    // Edit Task
    else if (e.target.closest(".edit-btn")) {
        let li = e.target.closest("li");
        let textSpan = li.querySelector(".task-text");
        
        // Simple prompt for editing (Intermediate level)
        let newText = prompt("Edit your task:", textSpan.textContent);
        
        // Validate the edit isn't empty
        if (newText !== null && newText.trim() !== "") {
            textSpan.textContent = newText;
            saveData();
        }
    }
}, false);

// Allow pressing "Enter" key to add task
inputBox.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});

// Local Storage Functions
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    const savedData = localStorage.getItem("data");
    if (savedData) {
        listContainer.innerHTML = savedData;
    }
}

// Load data on page startup
showTask();