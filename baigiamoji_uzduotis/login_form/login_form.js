var modal = document.getElementById("error_modal");

var span = document.getElementsByClassName("close")[0];

document.querySelector(".login_user").addEventListener("submit", login);

function login(e) {
  e.preventDefault();
  const first_name = e.target.elements.first_name.value;
  const last_name = e.target.elements.last_name.value;

  fetch("https://testapi.io/api/jce/resource/Users")
    .then((res) => res.json())
    .then((data) => {
      check_if_exists(first_name, last_name, data.data);
    })
    .catch((error) => console.log(error));
}

function check_if_exists(first_name, last_name, data) {
  let user_found = false;
  data.forEach((post) => {
    if (post.FirstName === first_name && post.LastName === last_name) {
      user_found = true;
    }
  });

  if (user_found === true) {
    localStorage.setItem("first_name", first_name);
    localStorage.setItem("last_name", last_name);
    window.location.href = "../todo_app/todo_app.html";
  } else {
    modal.style.display = "block";
  }
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
