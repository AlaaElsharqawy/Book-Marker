var siteName = document.getElementById("bookMark_Name");
var siteUrl = document.getElementById("bookMark_url");
var btnSubmit = document.getElementById("btnSubmit");
var lightContainer = document.querySelector(".light-container");
var btnClose = document.getElementById("btnClose");
var btnDelete = document.getElementById("btnDelete");
var btnVisit = document.getElementById("btnVisit");
var bookMarks = [];

var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

if (localStorage.getItem("siteContainer") != null) {
  bookMarks = JSON.parse(localStorage.getItem("siteContainer"));
  displayData();
}

btnSubmit.addEventListener("click", function () {
  clickSubmit();
});

function clickSubmit() {
  if (
    siteName.classList.contains("is-valid") &&
    siteUrl.classList.contains("is-valid")
  ) {
    var bookMark = {
      Name: siteName.value,
      Url: siteUrl.value,
    };

    bookMarks.push(bookMark);

    localStorage.setItem("siteContainer", JSON.stringify(bookMarks));

    displayData();
    clearInput();
  } else {
    lightContainer.classList.remove("d-none");
  }
}

function displayData() {
  var cartona = "";

  for (var i = 0; i < bookMarks.length; i++) {
    cartona += `
  <tr>
              <td>${i + 1}</td>
              <td>${bookMarks[i].Name}</td>              
              <td>
                <button  onclick="clickVisit('${i}')" id="btnVisit" class="btn btn-visit " data-index="${i}">
                  <i class="fa-solid fa-eye pe-2"></i>Visit
                </button>
              </td>
              <td>
                <button onclick="clickDelete('${i}')" id="btnDelete" class="btn btn-delete pe-2" data-index="${i}">
                  <i class="fa-solid fa-trash-can"></i>
                  Delete
                </button>
              </td>
          </tr>


`;
  }

  document.getElementById("tableContent").innerHTML = cartona;
}

function clearInput() {
  siteName.value = null;
  siteUrl.value = null;

  siteName.classList.remove("is-valid");
  siteUrl.classList.remove("is-valid");
}

function clickVisit(index) {
  if (urlRegex.test(bookMarks[index].Url)) {
    open(bookMarks[index].Url);
  } else {
    open(`https://${bookMarks[index].Url}`);
  }
}
function clickDelete(index) {
  bookMarks.splice(index, 1);
  localStorage.setItem("siteContainer", JSON.stringify(bookMarks));
  displayData();
}

// validation

siteName.addEventListener("input", function () {
  validationSite(siteName, nameRegex);
});

siteUrl.addEventListener("input", function () {
  validationSite(siteUrl, urlRegex);
});

function validationSite(element, regex) {
  var Regex = regex;
  var text = element.value;
  if (Regex.test(text)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    return false;
  }
}

btnClose.addEventListener("click", function () {
  Close();
});

function Close() {
  lightContainer.classList.add("d-none");
}

document.addEventListener("click", function (e) {
  if (e.target === lightContainer) Close();
});
