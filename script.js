window.addEventListener("DOMContentLoaded", getStudents);

// global array for fixed students
const allStudents = [];

// object prototype for fixed students
const studentName = {
  firstName: "",
  lastName: "",
  middleName: "",
  nickName: "",
  house: "",
  image: null,
  crest: null
};

// function fetch students from API
function getStudents() {
  // console.log("getStudents");
  fetch("https://petlatkea.dk/2020/hogwarts/students.json")
    .then(res => res.json())
    .then(fixStudents);
}

// function to clean up student list
function fixStudents(studentList) {
  // console.log("fixStudents");
  studentList.forEach(jsonObject => {
    // console.log(jsonObject);

    // create new student object from 'studentName' prototype
    let student = Object.create(studentName);

    // for full name - trim whitespace, change to lowercase, replace characters, split at spaces
    let fullname = jsonObject.fullname
      .trim()
      .toLowerCase()
      .replace(/[-""]/g, " ")
      .split(" ");

    // for house - trim whitespace and change to lowercase
    let house = jsonObject.house.trim().toLowerCase();

    // capitalize first letters of house and first name
    student.house = capitalizeFirstLetter(house);
    student.firstName = capitalizeFirstLetter(fullname[0]);

    // if full name is equal to 2 strings - capitalize first letter of 2nd string
    if (fullname.length == 2) {
      student.lastName = capitalizeFirstLetter(fullname[1]);

      // if full name is equal to 3 strings - capitalize first letter of 2nd and 3rd strings
    } else if (fullname.length == 3) {
      student.lastName = capitalizeFirstLetter(fullname[1]);
      student.middleName = capitalizeFirstLetter(fullname[2]);

      // if full name is equal to 4 strings - capitalize first letter of 2nd, 3rd and 4th strings
    } else if (fullname.length == 4) {
      student.middleName = capitalizeFirstLetter(fullname[1]);
      student.lastName = capitalizeFirstLetter(fullname[2]);
      student.nickName = capitalizeFirstLetter(fullname[3]);
    }

    // add student avatar photo
    student.image = "http://www.lovethatwillnotdie.com/hogwarts/avatars/" + student.lastName.toLowerCase() + "_" + student.firstName[0].toLowerCase() + ".png";

    // add student house crest
    student.crest = "http://www.lovethatwillnotdie.com/hogwarts/crests/" + student.house.toLowerCase() + ".png";

    // add fixed student to allStudents array
    allStudents.push(student);
    // console.log(student);
  });

  // show fixed students
  allStudents.forEach(showStudents);
}

//capitalize first letter
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// show students
function showStudents(studentName) {
  // console.log("showStudents");
  const template = document.querySelector("template").content;
  const studentCopy = template.cloneNode(true);
  const modal = document.getElementById("myModal");
  studentCopy.querySelector(".first_name").textContent = studentName.firstName;
  studentCopy.querySelector(".middle_name").textContent = studentName.middleName;
  studentCopy.querySelector(".last_name").textContent = studentName.nickName;
  studentCopy.querySelector(".nick_name").textContent = studentName.lastName;
  studentCopy.querySelector(".house").textContent = studentName.house;
  studentCopy.querySelector("button").addEventListener("click", () => {
    modal.classList.remove("hide");
    modal.style.display = "block";
    modal.querySelector(".modal_first_name").textContent = studentName.firstName;
    modal.querySelector(".modal_middle_name").textContent = studentName.middleName;
    modal.querySelector(".modal_last_name").textContent = studentName.lastName;
    modal.querySelector(".modal_nick_name").textContent = studentName.nickName;
    modal.querySelector(".modal_house").textContent = studentName.house;
    modal.querySelector(".modal_content").dataset.theme = studentName.house;
    modal.querySelector(".modal_image").src = studentName.image;
    modal.querySelector(".modal_crest").src = studentName.crest;
  });
  document.querySelector("#student_section").appendChild(studentCopy);
}

// start function to listen for filter Gryffindor
function filterButtons() {
  console.log("filterButtons");
  document.querySelector("[data-filter='gryffindor']").addEventListener("click", filterGryffindor);
}
filterButtons();

// function to filter Gryffindor students only
function filterGryffindor() {
  console.log("filterGryffindor");
  const onlyGryffindor = allStudents.filter(studentName.house === "gryffindor");
}

// get modal
const modal = document.getElementById("myModal");
modal.addEventListener("click", () => {
  modal.classList.add("hide");
});

// get element that closes the modal
const span = document.getElementsByClassName("close")[0];
span.onclick = function() {
  modal.style.display = "none";
};

// close modal - click anywhere outside
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
