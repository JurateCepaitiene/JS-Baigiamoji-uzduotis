function set_user_info(first_name, last_name) {
  const base_element = document.createElement("div");
  base_element.id = "user_info";
  base_element.style.border = "1px solid black";
  base_element.style.padding = "25px";
  base_element.style.margin = "25px";

  const full_name = document.createElement("h2");
  full_name.textContent = first_name + " " + last_name;
  base_element.append(full_name);

  document.querySelector(".user_info").append(base_element);
}

function open_create_modal(e) {
  // todo_form.elements.id.value = "";
  todo_form.elements.type.value = "";
  todo_form.elements.content.value = "";
  todo_form.elements.end_date.value = "";

  // todo_form.elements.id.style.display = "none";
  // document.getElementById("id_label").style.display = "none";
  todo_form.elements.modal_button.value = "SUBMIT";
  modal.style.display = "block";
}

function get_todos(full_name) {
  fetch("https://testapi.io/api/jce/resource/Todos")
    .then((res) => res.json())
    .then((data) => {
      create_todos_html(data.data, full_name);
    })
    .catch((error) => console.log(error));
}

function create_todos_html(data, full_name) {
  data.forEach((get) => {
    if (get.FLName === full_name) {
      const base_element = document.createElement("div");
      base_element.id = "post_id_" + get.id;
      base_element.style.border = "1px solid red";
      base_element.style.padding = "50px";
      base_element.style.margin = "50px";

      const type = document.createElement("h2");
      type.textContent = get.Type;
      base_element.append(type);

      const content = document.createElement("p");
      content.textContent = get.Content;
      base_element.append(content);

      const end_date = document.createElement("p");
      end_date.textContent = get.EndDate;
      base_element.append(end_date);

      const edit_button = document.createElement("button");
      edit_button.addEventListener("click", open_edit_modal);
      edit_button.textContent = "Edit";
      base_element.append(edit_button);

      const delete_button = document.createElement("button");
      delete_button.addEventListener("click", delete_todo);
      delete_button.textContent = "Delete";
      base_element.append(delete_button);

      document.querySelector(".todos").append(base_element);
    }
  });
}

function open_edit_modal(e) {
  // todo_form.elements.id.style.display = "inline";
  // document.getElementById("id_label").style.display = "inline";
  todo_form.elements.modal_button.value = "SAVE";
  modal.style.display = "block";

  const id = e.target.parentElement.id.substring(8);
  const type = document.querySelector(
    `#${e.target.parentElement.id} h2`
  ).textContent;
  const content = document.querySelector(
    `#${e.target.parentElement.id} p:nth-of-type(1)`
  ).textContent;
  const end_date = document.querySelector(
    `#${e.target.parentElement.id} p:nth-of-type(2)`
  ).textContent;

  todo_form.elements.id.value = id;
  todo_form.elements.type.value = type;
  todo_form.elements.content.value = content;
  todo_form.elements.end_date.value = end_date;
}

function delete_todo(e) {
  const id = e.target.parentElement.id.substring(8);

  fetch(`https://testapi.io/api/jce/resource/Todos/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (res.ok) {
        document.querySelector(`#${e.target.parentElement.id}`).remove();
      }
    })
    .catch((error) => console.log(error));
}

function post_todo(body) {
  fetch("https://testapi.io/api/jce/resource/Todos", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((data) => {
      document.querySelector(".todos").innerHTML = "";
      get_todos(full_name);
      modal.style.display = "none";
    })
    .catch((error) => console.log(error));
}

function put_todo(body, id) {
  fetch(`https://testapi.io/api/jce/resource/Todos/${id}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((data) => {
      document.querySelector(".todos").innerHTML = "";
      get_todos(full_name);
      modal.style.display = "none";
    })
    .catch((error) => console.log(error));
}

function submit_todo(e) {
  e.preventDefault();
  const type = e.target.elements.type.value;
  const content = e.target.elements.content.value;
  const end_date = e.target.elements.end_date.value;

  const body = {
    Type: type,
    Content: content,
    EndDate: end_date,
    FLName: full_name,
  };

  if (todo_form.elements.modal_button.value === "SUBMIT") {
    post_todo(body);
  } else {
    const id = e.target.elements.id.value;
    put_todo(body, id);
  }
}

var modal = document.getElementById("modal");
var todo_form = document.querySelector(".todo");

var span = document.getElementsByClassName("close")[0];

var first_name = localStorage.getItem("first_name");
var last_name = localStorage.getItem("last_name");
var full_name = first_name + last_name;

var add_button = document.getElementById("add");
add_button.addEventListener("click", open_create_modal);

todo_form.addEventListener("submit", submit_todo);

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

span.onclick = function () {
  modal.style.display = "none";
};

set_user_info(first_name, last_name);
get_todos(full_name);
