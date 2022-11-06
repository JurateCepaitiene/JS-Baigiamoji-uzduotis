document.querySelector(".register_user").addEventListener("submit", register);

function register(e) {
  e.preventDefault();
  const first_name = e.target.elements.first_name.value;
  const last_name = e.target.elements.last_name.value;
  const email = e.target.elements.email.value;

  const post = {
    FirstName: first_name,
    LastName: last_name,
    Email: email,
  };

  fetch("https://testapi.io/api/jce/resource/Users", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(post),
  }).then((ignored) => {
    localStorage.setItem("first_name", first_name);
    localStorage.setItem("last_name", last_name);
    window.location.href = "../todo_app/todo_app.html";
  });
}
