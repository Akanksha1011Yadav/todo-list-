// GLOBAL VARIABLE FOR EDIT
let editIndex = -1;


// REGISTER
function register(){

let name=document.getElementById("name").value
let email=document.getElementById("email").value
let password=document.getElementById("password").value

localStorage.setItem(email,password)

alert("Registration Successful")

window.location="index.html"

}


// LOGIN
function login(){

let email=document.getElementById("email").value
let password=document.getElementById("password").value

let storedPassword=localStorage.getItem(email)

if(password===storedPassword){

alert("Login Successful")

window.location="dashboard.html"

}else{

alert("Invalid Login")

}

}


// LOGOUT
function logout(){
window.location="index.html"
}


// SEARCH TEACHER
function searchTeacher(){

let teachers=JSON.parse(localStorage.getItem("teachers")) || []

let list=document.getElementById("teacherList")

list.innerHTML=""

if(teachers.length===0){
list.innerHTML="<p>No teachers available</p>"
return
}

teachers.forEach(function(t){

list.innerHTML+=`
<div class="teacher">
<b>${t.name}</b><br>
${t.dept} - ${t.subject}
</div>
`

})

}


// BOOK APPOINTMENT
function bookAppointment(){

let teacher=document.getElementById("teacherName").value
let date=document.getElementById("date").value
let time=document.getElementById("time").value

if(teacher=="" || date=="" || time==""){
alert("Please fill all fields before booking appointment")
return
}

let appointments=JSON.parse(localStorage.getItem("appointments")) || []

appointments.push({
teacher:teacher,
date:date,
time:time
})

localStorage.setItem("appointments",JSON.stringify(appointments))

alert("Appointment booked successfully")

document.getElementById("teacherName").value=""
document.getElementById("date").value=""
document.getElementById("time").value=""

}


// SEND MESSAGE
function sendMessage(){

let msg=document.getElementById("message").value

if(msg==""){
alert("Please write a message")
return
}

console.log("Message:",msg)

alert("Message Sent")

document.getElementById("message").value=""

}


// ADD OR UPDATE TEACHER
function addTeacher(){

let name=document.getElementById("tname").value
let dept=document.getElementById("dept").value
let subject=document.getElementById("subject").value

if(name=="" || dept=="" || subject==""){
alert("Please fill all fields")
return
}

let teachers=JSON.parse(localStorage.getItem("teachers")) || []

// UPDATE MODE
if(editIndex !== -1){

teachers[editIndex] = {
name:name,
dept:dept,
subject:subject
}

alert("Teacher Updated")

editIndex = -1

document.getElementById("addBtn").innerText="Add Teacher"

}
else{

teachers.push({
name:name,
dept:dept,
subject:subject
})

alert("Teacher Added")

}

localStorage.setItem("teachers",JSON.stringify(teachers))

document.getElementById("tname").value=""
document.getElementById("dept").value=""
document.getElementById("subject").value=""

showTeachers()

}


// SHOW TEACHERS
function showTeachers(){

let teachers=JSON.parse(localStorage.getItem("teachers")) || []

let container=document.getElementById("teacherList")

if(!container) return

container.innerHTML=""

teachers.forEach(function(t,index){

container.innerHTML+=`

<div class="teacher">

<b>${t.name}</b><br>
${t.dept} - ${t.subject}

<br><br>

<button onclick="editTeacher(${index})">Edit</button>
<button onclick="deleteTeacher(${index})">Delete</button>

</div>

`

})

}


// EDIT TEACHER
function editTeacher(index){

let teachers=JSON.parse(localStorage.getItem("teachers")) || []

let teacher=teachers[index]

document.getElementById("tname").value=teacher.name
document.getElementById("dept").value=teacher.dept
document.getElementById("subject").value=teacher.subject

editIndex = index

document.getElementById("addBtn").innerText="Update Teacher"

}


// DELETE TEACHER
function deleteTeacher(index){

let teachers=JSON.parse(localStorage.getItem("teachers")) || []

teachers.splice(index,1)

localStorage.setItem("teachers",JSON.stringify(teachers))

showTeachers()

}


// SHOW APPOINTMENTS IN ADMIN PANEL
function loadAppointments(){

let appointments=JSON.parse(localStorage.getItem("appointments")) || []

let container=document.getElementById("appointments")

if(!container) return

if(appointments.length===0){

container.innerHTML="<p>No appointments available</p>"
return

}

container.innerHTML=""

appointments.forEach(function(a,index){

container.innerHTML+=`
<div class="teacher">

<b>Teacher:</b> ${a.teacher}<br>
<b>Date:</b> ${a.date}<br>
<b>Time:</b> ${a.time}

<br><br>

<button onclick="deleteAppointment(${index})">Delete</button>

</div>
`

})

}
function deleteAppointment(index){

let appointments=JSON.parse(localStorage.getItem("appointments")) || []

appointments.splice(index,1)

localStorage.setItem("appointments",JSON.stringify(appointments))

alert("Appointment Deleted")

loadAppointments()

}

// PAGE LOAD
window.onload=function(){

showTeachers();      // loads teachers in admin panel
loadAppointments();  // loads appointments in admin panel
searchTeacher();     // loads teachers in student dashboard

}