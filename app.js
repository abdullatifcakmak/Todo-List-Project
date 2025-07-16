let form = document.querySelector("#todoAddForm");
let addInput = document.querySelector("#todoName");
let todoList = document.querySelector(".list-group");
let firstCardBody = document.querySelectorAll(".card-body")[0];
let secondCardBody = document.querySelectorAll(".card-body")[1];
let clearButton = document.querySelector("#clearButton");
let filterInput = document.querySelector("#todoSearch");

let todos = [];

runEvents();

function runEvents() {
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", pageLoaded);
  secondCardBody.addEventListener("click", removeTodoToUI);
  clearButton.addEventListener("click", allClearTodos);
  filterInput.addEventListener("keyup", filter);
}

function filter(e) {
  const filterValue = e.target.value.toLowerCase().trim();
  const todoListesi = document.querySelectorAll(".list-group-item");

  if (todoListesi.length > 0) {
    todoListesi.forEach(function (todo) {
      if (todo.textContent.toLowerCase().trim().includes(filterValue)) {
        todo.setAttribute("style", "display : block");
      } else {
        todo.setAttribute("style", "display : none !important");
      }
    });
  } else {
    showAlert("warning", "Görüntülenecek todo yok!");
  }
}

function allClearTodos() {
  const todoListesi = document.querySelectorAll(".list-group-item");

  if (todoListesi.length > 0) {
    todoListesi.forEach(function (todo) {
      todo.remove();
    });
    showAlert("success", "Tüm todolar silindi.");
  } else {
    showAlert("warning", "Silmek için en az 1 tane todo olmalıdır!");
  }

  todos = [];
  localStorage.setItem("todos", JSON.stringify(todos));
}

function pageLoaded() {
  todoList.innerHTML = "";
  checkTodosFromStorage();
  todos.forEach(function (todo, index) {
    adTodoToUI(todo, index);
  });
}

function removeTodoToUI(e) {
  if (e.target.className === "btn-close") {
    const todo = e.target.parentElement.parentElement;
    todo.remove();

    removeTodoToStorage(e.target.id);

    pageLoaded();

    showAlert("success", "Todo Başarıyla silindi..");
  }
}

function removeTodoToStorage(index) {
  checkTodosFromStorage();

  todos.splice(index, 1);

  // todos.forEach(function (todo, index) {
  //   if (removeTodo === todo) {
  //     todos.splice(index, 1);
  //   }
  // });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo(e) {
  const inputText = addInput.value.trim();
  if (inputText == null || inputText == "") {
    showAlert("warning", "Lütfen boş bırakmayınız!");
  } else {
    checkTodosFromStorage();
    index = todos.length;
    adTodoToUI(inputText, index);
    adTodoToStorage(inputText);
    showAlert("success", "Todo Eklendi.");
  }
  e.preventDefault();
}

function adTodoToUI(newTodo, index) {
  /*       <li class="list-group-item d-flex justify-content-between">todo1
       <a href="#" class="delete-item">
           <i class="fa fa-remove"></i>
       </a>
   </li> */

  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between";
  li.textContent = newTodo;

  const a = document.createElement("a");
  a.href = "#";
  a.className = "delete-item";

  const i = document.createElement("i");
  i.className = "btn-close";
  i.id = index;

  a.appendChild(i);
  li.appendChild(a);
  todoList.appendChild(li);

  addInput.value = "";
}

function adTodoToStorage(newTodo) {
  checkTodosFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function checkTodosFromStorage() {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
}

function showAlert(type, message) {
  const div = document.createElement("div");
  //div.className = "alert alert-" + type;
  div.className = `alert alert-${type}`;
  div.role = "alert";
  div.textContent = message;

  secondCardBody.appendChild(div);

  setTimeout(function () {
    div.remove();
  }, 2000);
}
