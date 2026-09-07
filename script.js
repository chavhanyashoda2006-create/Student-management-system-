function addStudent() {

    let name = document.getElementById("name").value;
    let course = document.getElementById("course").value;
    let marks = document.getElementById("marks").value;

    if (name === "" || course === "" || marks === "") {
        alert("Please fill all fields");
        return;
    }

    let table = document.getElementById("studentList");

    let row = table.insertRow();

    row.insertCell(0).innerHTML = name;
    row.insertCell(1).innerHTML = course;
    row.insertCell(2).innerHTML = marks;

    row.insertCell(3).innerHTML =
        '<button onclick="deleteStudent(this)">Delete</button>';

    document.getElementById("name").value = "";
    document.getElementById("course").value = "";
    document.getElementById("marks").value = "";
}


function deleteStudent(button) {

    let row = button.parentElement.parentElement;

    row.remove();
}
