window.addEventListener("DOMContentLoaded", getStudents);

// fetch students from API
function getStudents() {
  fetch("json/students1991.json")
    .then(res => res.json())
    .then(loadStudents);
}

function loadStudents(studentNames) {
  studentNames.forEach(function(student) {
    const studentList = document.querySelector(".student_list").content;
    const studentCopy = studentList.cloneNode(true);
    const singleStudent = studentCopy.querySelector(".single_student");
    const link = singleStudent.querySelector(".name");

    link.textContent = student.fullname;
    link.setAttribute("name", student.fullname);
    link.setAttribute("house", student.house);
    link.onclick = function() {
      showDetails(this);
      console.log(student.house);
    };

    // append copy to section
    document.querySelector("#student_section").appendChild(studentCopy);
  });
}

// select theme
document.querySelector("select#theme").addEventListener("change", selected);

// change theme
function selected() {
  const selectedTheme = this.value;
  document.querySelector(".modal_content").style.setProperty("background-color", "var(--theme-" + this.value + ")");
  document.querySelector(".modal_name").style.setProperty("font-size", "100px");
}

// the modal information
function showDetails(data) {
  modal.querySelector(".modal_name").textContent = data.getAttribute("name");
  modal.querySelector(".modal_house").textContent = data.getAttribute("house");
  modal.style.display = "block";
}

// get modal
const modal = document.getElementById("myModal");

// get element that closes the modal
const span = document.getElementsByClassName("close")[0];

// close modal - click x
span.onclick = function() {
  modal.style.display = "none";
};

// close modal - click anywhere outside
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
