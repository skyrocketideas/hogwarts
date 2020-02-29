"use strict";

window.addEventListener("DOMContentLoaded", start);

const allStudents = [];
let filteredStudentsArray = [];
const missingPhoto = "";

// stats variables arrays
const studentStatsGryffindor = [];
const studentStatsRavenclaw = [];
const studentStatsHufflepuff = [];
const studentStatsSlytherin = [];
const studentStatsAll = [];

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

// start function to listen for events
function start() {
  // console.log("start");
  document.querySelector("[data-filter='*']").addEventListener("click", filterAll);
  document.querySelector("[data-filter='gryffindor']").addEventListener("click", filterGryffindor);
  document.querySelector("[data-filter='ravenclaw']").addEventListener("click", filterRavenclaw);
  document.querySelector("[data-filter='hufflepuff']").addEventListener("click", filterHufflepuff);
  document.querySelector("[data-filter='slytherin']").addEventListener("click", filterSlytherin);
  getStudents();
}

// function fetch students from API
function getStudents() {
  // console.log("getStudents");
  fetch("https://petlatkea.dk/2020/hogwarts/students.json")
    .then(res => res.json())
    .then(fixStudents);
  fetchBloodData(allStudents);
}

// fetch blood statuses from API
function fetchBloodData(allStudents) {
  // console.log("fetchBloodData");
  fetch("https://petlatkea.dk/2020/hogwarts/families.json")
    .then(res => res.json())
    .then(data => {
      assignBloodStatus(data.half, allStudents);
      // console.log(allStudents);
    });
}

// assign blood status
function assignBloodStatus(bloodStatuses, students) {
  // console.log("assignBloodStatus");
  students.forEach(student => {
    if (bloodStatuses.includes(student.lastName)) {
      student.bloodStatus = "half";
    } else {
      student.bloodStatus = "pure";
    }
  });
}

// function to clean up student list
function fixStudents(studentList) {
  // console.log("fixStudents");
  studentList.forEach(jsonObject => {
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

    // if student photo is missing
    if (studentName.image === undefined) {
      const studentPhoto = missingPhoto;
    } else {
      const studentPhoto = student.image;
    }

    // add fixed student to allStudents array
    document.querySelector("#student_section").innerHTML = "";
    allStudents.push(student);
  });
  // show fixed students
  allStudents.forEach(showStudents);
  gryffindorStats();
}

// capitalize first letter and add rest of first string
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// function to get Gryffindor house length and append to stats
function gryffindorStats() {
  // console.log("gryffindorStats");
  allStudents.forEach(student => {
    if (student.house.toLowerCase() === "gryffindor") {
      studentStatsGryffindor.push(student);
    }
  });
  const numberInGryffindor = studentStatsGryffindor.length;
  console.log(numberInGryffindor);
  document.getElementById("numberInGryffindor").textContent = numberInGryffindor;
  ravenclawStats();
}

// function to get Ravenclaw house length and append to stats
function ravenclawStats() {
  // console.log("ravenclawStats");
  allStudents.forEach(student => {
    if (student.house.toLowerCase() === "ravenclaw") {
      studentStatsRavenclaw.push(student);
    }
  });
  const numberInRavenclaw = studentStatsRavenclaw.length;
  console.log(studentStatsRavenclaw.length);
  document.getElementById("numberInRavenclaw").innerText = numberInRavenclaw;
  hufflepuffStats();
}

hufflepuffStats();
// function to get Hufflepuff house length and append to stats
function hufflepuffStats() {
  // console.log("hufflepuffStats");
  allStudents.forEach(student => {
    if (student.house.toLowerCase() === "hufflepuff") {
      studentStatsHufflepuff.push(student);
    }
  });
  const numberInHufflepuff = studentStatsHufflepuff.length;
  document.getElementById("numberInHufflepuff").textContent = numberInHufflepuff;
  slytherinStats();
}

// function to get Slytherin house length and append to stats
function slytherinStats() {
  // console.log("slytherinStats");
  allStudents.forEach(student => {
    if (student.house.toLowerCase() === "slytherin") {
      studentStatsSlytherin.push(student);
    }
  });
  const numberInSlytherin = studentStatsSlytherin.length;
  document.getElementById("numberInSlytherin").innerText = numberInSlytherin;
  allStats();
}

// function to get all house length and append to stats
function allStats() {
  // console.log("allStats");
  allStudents.forEach(student => {
    if (student.house.toLowerCase() === "hufflepuff" || "slytherin" || "gryffindor" || "ravenclaw") {
      studentStatsAll.push(student);
    }
  });
  const numberInAll = studentStatsAll.length;
  document.getElementById("numberInAll").innerText = numberInAll;
}

// function to filter only Gryffindor
function filterGryffindor(student) {
  filteredStudentsArray = [];
  // console.log("filterGryffindor");
  allStudents.forEach(student => {
    if (student.house.toLowerCase() === "gryffindor") {
      filteredStudentsArray.push(student);
    }
  });
  // clear the list
  document.querySelector("#student_section").innerHTML = "";
  filteredStudentsArray.forEach(showStudents);
}

// function to filter only Ravenclaw
function filterRavenclaw(student) {
  filteredStudentsArray = [];
  // console.log("filterRavenclaw");
  allStudents.forEach(student => {
    if (student.house.toLowerCase() === "ravenclaw") {
      filteredStudentsArray.push(student);
    }
  });
  // clear the list
  document.querySelector("#student_section").innerHTML = "";
  filteredStudentsArray.forEach(showStudents);
}

// function to filter only Hufflepuff
function filterHufflepuff(student) {
  filteredStudentsArray = [];
  // console.log("filterHufflepuff");
  allStudents.forEach(student => {
    if (student.house.toLowerCase() === "hufflepuff") {
      filteredStudentsArray.push(student);
    }
  });
  // clear the list
  document.querySelector("#student_section").innerHTML = "";
  filteredStudentsArray.forEach(showStudents);
}

// function to filter only Slytherin
function filterSlytherin(student) {
  filteredStudentsArray = [];
  // console.log("filterSlytherin");
  allStudents.forEach(student => {
    if (student.house.toLowerCase() === "slytherin") {
      filteredStudentsArray.push(student);
    }
  });
  // clear the list
  document.querySelector("#student_section").innerHTML = "";
  filteredStudentsArray.forEach(showStudents);
}

// function to filter all
function filterAll(student) {
  filteredStudentsArray = [];
  // console.log("filterAll");
  allStudents.forEach(student => {
    if (student.house.toLowerCase() === "hufflepuff" || "slytherin" || "gryffindor" || "ravenclaw") {
      filteredStudentsArray.push(student);
    }
  });
  // clear the list
  document.querySelector("#student_section").innerHTML = "";
  filteredStudentsArray.forEach(showStudents);
}

// show students
function showStudents(studentName) {
  // console.log("showStudents");
  const template = document.querySelector("template").content;
  const studentCopy = template.cloneNode(true);
  studentCopy.querySelector(".first_name").textContent = studentName.firstName;
  studentCopy.querySelector(".middle_name").textContent = studentName.middleName;
  studentCopy.querySelector(".last_name").textContent = studentName.nickName;
  studentCopy.querySelector(".nick_name").textContent = studentName.lastName;
  studentCopy.querySelector(".house").textContent = studentName.house;
  studentCopy.querySelector("button").addEventListener("click", () => {
    getModal(studentName);
  });
  document.querySelector("#student_section").appendChild(studentCopy);
}

// function to call modal
function getModal(studentName) {
  const modal = document.getElementById("myModal");
  const span = document.getElementsByClassName("close")[0];
  modal.classList.remove("hide");
  modal.style.display = "block";
  modal.querySelector(".modal_first_name").textContent = studentName.firstName;
  modal.querySelector(".modal_middle_name").textContent = studentName.middleName;
  modal.querySelector(".modal_last_name").textContent = studentName.lastName;
  modal.querySelector(".modal_nick_name").textContent = studentName.nickName;
  modal.querySelector(".modal_house").textContent = studentName.house;
  modal.querySelector(".modal_blood").textContent = studentName.bloodStatus;
  modal.querySelector(".modal_content").dataset.theme = studentName.house;
  modal.querySelector(".modal_image").src = studentName.image;
  modal.querySelector(".modal_crest").src = studentName.crest;
  // close modal by clicking on X
  span.onclick = () => {
    modal.style.display = "none";
  };
  // close modal by clicking anywhere outside
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}
