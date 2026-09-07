let students = JSON.parse(localStorage.getItem("students")) || [];

let editIndex = -1;

const form = document.getElementById("studentForm");
const nameInput = document.getElementById("name");
const courseInput = document.getElementById("course");
const marksInput = document.getElementById("marks");
const studentList = document.getElementById("studentList");
const searchInput = document.getElementById("search");


// Add / Update Student
form.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = nameInput.value.trim();
    const course = courseInput.value.trim();
    const marks = Number(marksInput.value);

    if (name === "" || course === "" || marksInput.value === "") {
        alert("Please fill all fields.");
        return;
    }

    if (marks < 0 || marks > 100) {
        alert("Marks must be between 0 and 100.");
        return;
    }


    const student = {
        name: name,
        course: course,
        marks: marks
    };


    if (editIndex === -1) {

        students.push(student);

    } else {

        students[editIndex] = student;
        editIndex = -1;

        document.querySelector(".btn").textContent = "+ Add Student";
    }


    saveStudents();

    form.reset();

    displayStudents();

});


// Display Students
function displayStudents(searchText = "") {

    studentList.innerHTML = "";

    const filteredStudents = students.filter(function (student) {

        return student.name
            .toLowerCase()
            .includes(searchText.toLowerCase());

    });


    filteredStudents.forEach(function (student) {

        const originalIndex = students.indexOf(student);

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${originalIndex + 1}</td>

            <td>${student.name}</td>

            <td>${student.course}</td>

            <td>${student.marks}</td>

            <td>
                <button onclick="editStudent(${originalIndex})">
                    Edit
                </button>

                <button onclick="deleteStudent(${originalIndex})">
                    Delete
                </button>
            </td>
        `;

        studentList.appendChild(row);

    });


    updateStatistics();


    const emptyMessage = document.getElementById("emptyMessage");

    if (filteredStudents.length === 0) {

        emptyMessage.style.display = "block";

    } else {

        emptyMessage.style.display = "none";

    }

}


// Delete Student
function deleteStudent(index) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this student?"
    );

    if (confirmDelete) {

        students.splice(index, 1);

        saveStudents();

        displayStudents(searchInput.value);

    }

}


// Edit Student
function editStudent(index) {

    const student = students[index];

    nameInput.value = student.name;
    courseInput.value = student.course;
    marksInput.value = student.marks;

    editIndex = index;

    document.querySelector(".btn").textContent = "Update Student";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// Search Student
searchInput.addEventListener("input", function () {

    displayStudents(this.value);

});


// Statistics
function updateStatistics() {

    const total = students.length;

    document.getElementById("totalStudents").textContent = total;


    if (total === 0) {

        document.getElementById("averageMarks").textContent = "0";
        document.getElementById("highestMarks").textContent = "0";

        return;
    }


    const totalMarks = students.reduce(function (sum, student) {

        return sum + student.marks;

    }, 0);


    const average = totalMarks / total;


    const highest = Math.max(
        ...students.map(function (student) {
            return student.marks;
        })
    );


    document.getElementById("averageMarks").textContent =
        average.toFixed(2);

    document.getElementById("highestMarks").textContent =
        highest;

}


// Save data in Local Storage
function saveStudents() {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

}


// Load students when page opens
displayStudents();
