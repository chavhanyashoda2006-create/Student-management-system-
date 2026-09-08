// =========================================
// STUDENT MANAGEMENT SYSTEM
// =========================================

// Load saved students
let students = JSON.parse(localStorage.getItem("students")) || [];

let editIndex = -1;
let marksChart = null;


// =========================================
// HTML ELEMENTS
// =========================================

const form = document.getElementById("studentForm");
const nameInput = document.getElementById("name");
const courseInput = document.getElementById("course");
const marksInput = document.getElementById("marks");

const studentList = document.getElementById("studentList");
const searchInput = document.getElementById("search");


// =========================================
// SAVE STUDENTS
// =========================================

function saveStudents() {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

}


// =========================================
// ADD / UPDATE STUDENT
// =========================================

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = nameInput.value.trim();
    const course = courseInput.value.trim();
    const marks = Number(marksInput.value);

    if (
        name === "" ||
        course === "" ||
        marksInput.value === ""
    ) {

        showMessage(
            "Please fill all fields.",
            "error"
        );

        return;
    }

    if (marks < 0 || marks > 100) {

        showMessage(
            "Marks must be between 0 and 100.",
            "error"
        );

        return;
    }


    const student = {
        name: name,
        course: course,
        marks: marks
    };


    if (editIndex === -1) {

        students.push(student);

        showMessage(
            "Student added successfully! 🎉",
            "success"
        );

    } else {

        students[editIndex] = student;

        editIndex = -1;

        document.querySelector(".btn").textContent =
            "+ Add Student";

        showMessage(
            "Student updated successfully! ✨",
            "success"
        );
    }


    saveStudents();

    form.reset();

    displayStudents();

    updateStatistics();

    updateChart();

});


// =========================================
// DISPLAY STUDENTS
// =========================================

function displayStudents(searchText = "") {

    studentList.innerHTML = "";


    const filterElement =
        document.getElementById("courseFilter");

    const filterValue =
        filterElement ? filterElement.value : "all";


    const filteredStudents =
        students.filter(function(student) {

            const matchesSearch =
                student.name
                    .toLowerCase()
                    .includes(
                        searchText.toLowerCase()
                    );


            const matchesCourse =
                filterValue === "all" ||
                student.course.toLowerCase() ===
                filterValue.toLowerCase();


            return matchesSearch && matchesCourse;

        });


    filteredStudents.forEach(function(student) {

        const originalIndex =
            students.indexOf(student);


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>${originalIndex + 1}</td>

            <td>${student.name}</td>

            <td>${student.course}</td>

            <td>${student.marks}</td>

            <td>

                <button
                    onclick="editStudent(${originalIndex})">
                    Edit
                </button>

                <button
                    onclick="deleteStudent(${originalIndex})">
                    Delete
                </button>

            </td>
        `;


        studentList.appendChild(row);

    });


    const emptyMessage =
        document.getElementById("emptyMessage");


    if (emptyMessage) {

        emptyMessage.style.display =
            filteredStudents.length === 0
                ? "block"
                : "none";

    }


    updateStatistics();

}


// =========================================
// DELETE STUDENT
// =========================================

function deleteStudent(index) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this student?"
        );


    if (!confirmDelete) {
        return;
    }


    students.splice(index, 1);

    saveStudents();

    displayStudents(searchInput.value);

    updateStatistics();

    updateChart();


    showMessage(
        "Student deleted successfully! 🗑️",
        "success"
    );

}


// =========================================
// EDIT STUDENT
// =========================================

function editStudent(index) {

    const student = students[index];


    nameInput.value =
        student.name;

    courseInput.value =
        student.course;

    marksInput.value =
        student.marks;


    editIndex = index;


    const button =
        document.querySelector(".btn");


    if (button) {

        button.textContent =
            "Update Student";

    }


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// =========================================
// SEARCH
// =========================================

searchInput.addEventListener(
    "input",
    function() {

        displayStudents(this.value);

    }
);


// =========================================
// COURSE FILTER
// =========================================

const courseFilter =
    document.getElementById("courseFilter");


if (courseFilter) {

    courseFilter.addEventListener(
        "change",
        function() {

            displayStudents(
                searchInput.value
            );

        }
    );

}


// =========================================
// STATISTICS
// =========================================

function updateStatistics() {

    const total =
        students.length;


    const totalElement =
        document.getElementById(
            "totalStudents"
        );

    const averageElement =
        document.getElementById(
            "averageMarks"
        );

    const highestElement =
        document.getElementById(
            "highestMarks"
        );

    const lowestElement =
        document.getElementById(
            "lowestMarks"
        );

    const passElement =
        document.getElementById(
            "passStudents"
        );


    if (totalElement) {

        totalElement.textContent =
            total;

    }


    if (total === 0) {

        if (averageElement)
            averageElement.textContent = "0";

        if (highestElement)
            highestElement.textContent = "0";

        if (lowestElement)
            lowestElement.textContent = "0";

        if (passElement)
            passElement.textContent = "0";

        return;
    }


    const marks =
        students.map(function(student) {

            return student.marks;

        });


    const totalMarks =
        marks.reduce(function(sum, mark) {

            return sum + mark;

        }, 0);


    const average =
        totalMarks / total;


    const highest =
        Math.max(...marks);


    const lowest =
        Math.min(...marks);


    const passed =
        students.filter(function(student) {

            return student.marks >= 35;

        }).length;


    if (averageElement)
        averageElement.textContent =
            average.toFixed(2);


    if (highestElement)
        highestElement.textContent =
            highest;


    if (lowestElement)
        lowestElement.textContent =
            lowest;


    if (passElement)
        passElement.textContent =
            passed;

}


// =========================================
// DARK MODE
// =========================================

function toggleDarkMode() {

    document.body.classList.toggle(
        "dark-mode"
    );


    const isDark =
        document.body.classList.contains(
            "dark-mode"
        );


    localStorage.setItem(
        "darkMode",
        isDark
    );


    const button =
        document.querySelector(".dark-btn");


    if (button) {

        button.textContent =
            isDark
                ? "☀️ Light Mode"
                : "🌙 Dark Mode";

    }

}


// Load saved Dark Mode

if (
    localStorage.getItem("darkMode") === "true"
) {

    document.body.classList.add(
        "dark-mode"
    );


    const button =
        document.querySelector(".dark-btn");


    if (button) {

        button.textContent =
            "☀️ Light Mode";

    }

}


// =========================================
// EXPORT CSV
// =========================================

function exportCSV() {

    if (students.length === 0) {

        showMessage(
            "No student records to export.",
            "error"
        );

        return;
    }


    let csv =
        "Student Name,Course,Marks\n";


    students.forEach(function(student) {

        csv +=
            `"${student.name}","${student.course}",${student.marks}\n`;

    });


    const blob =
        new Blob(
            [csv],
            {
                type: "text/csv;charset=utf-8;"
            }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;

    link.download =
        "student-records.csv";


    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);


    URL.revokeObjectURL(url);


    showMessage(
        "Student records exported! 📥",
        "success"
    );

}


// =========================================
// MARKS CHART
// =========================================

function updateChart() {

    const canvas =
        document.getElementById(
            "marksChart"
        );


    if (!canvas) {
        return;
    }


    if (typeof Chart === "undefined") {

        console.log(
            "Chart.js is not loaded."
        );

        return;
    }


    const labels =
        students.map(function(student) {

            return student.name;

        });


    const marks =
        students.map(function(student) {

            return student.marks;

        });


    if (marksChart) {

        marksChart.destroy();

    }


    marksChart =
        new Chart(canvas, {

            type: "bar",

            data: {

                labels: labels,

                datasets: [

                    {

                        label:
                            "Student Marks",

                        data: marks,

                        borderWidth: 1

                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                scales: {

                    y: {

                        beginAtZero: true,

                        max: 100

                    }

                },

                plugins: {

                    legend: {

                        display: true

                    }

                }

            }

        });

}


// =========================================
// NOTIFICATION
// =========================================

function showMessage(
    message,
    type
) {

    let messageBox =
        document.getElementById(
            "messageBox"
        );


    if (!messageBox) {

        messageBox =
            document.createElement("div");

        messageBox.id =
            "messageBox";

        document.body.appendChild(
            messageBox
        );

    }


    messageBox.textContent =
        message;

    messageBox.className =
        "message " + type;


    setTimeout(function() {

        messageBox.className =
            "message";

    }, 2500);

}


// =========================================
// INITIAL LOAD
// =========================================

displayStudents();

updateStatistics();

updateChart();
