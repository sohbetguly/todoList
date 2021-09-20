let urlUsers = "https://jsonplaceholder.typicode.com/users";
let urlTotoList = "https://jsonplaceholder.typicode.com/todos";

const numOfusers = 10;

function fetchUserInfo() {
  Promise.all([fetch(urlUsers), fetch(urlTotoList)])
    .then(function (responses) {
      // Get a JSON object from each of the responses
      return Promise.all(
        responses.map(function (response) {
          return response.json();
        })
      );
    })
    .then(function (data) {
      const user = data[0];
      const todos = data[1];

      for (let i = 0; i < numOfusers; i++) {
        const divView = document.createElement("div");

        divView.className = "one";
        const paragr = document.createElement("p");
        paragr.className = "parDesign";
        const par = document.createElement("h1");
        par.className = "list";
        divView.id = "info" + i;
        divView.addEventListener("click", function () {
          document.getElementById("general").innerHTML = "";
          document.getElementById("ordered").innerHTML = "";
          document.getElementById("allInOne").innerHTML =
            "<h1 class='list'>" + user[i].name + "'s todo list" + "</h1>";
          document.getElementById("ordered").innerHTML = "";
          for (let a = 0; a < todos.length; a++) {
            if (todos[a].userId == i + 1) {
              if (todos[a].completed == true) {
                document.getElementById("ordered").innerHTML +=
                  "<p class='greenCol'>" + todos[a].title + "</p>";
              } else {
                document.getElementById("ordered").innerHTML +=
                  "<p class='redCol'>" + todos[a].title + "</p>";
              }
            }
          }
        });
        document.getElementById("general").append(divView);
        // divView.innerText =
        divView.append(par);
        divView.append(paragr);
        par.innerHTML += user[i].name;
        paragr.innerHTML += "click here to see " + "todo list <br>";
      }
    });
}

function fetchTodoList() {
  document.getElementById("general").classList.remove("wrapper");
  document.getElementById("general").classList.add("todoListWrapper");
  fetch(urlTotoList)
    .then((res) => res.json())
    .then((out) => {
      for (let i = 0; i < numOfusers; i++) {
        const todoDiv = document.createElement("div");
        const todoH1 = document.createElement("h1");
        const todoLi = document.createElement("p");
        todoH1.className = "userName";
        todoDiv.className = "card";
        todoLi.id = "todoList" + i;

        todoLi.addEventListener("click", function () {
          todoLi.innerHTML = out[i].title;
        });

        document.getElementById("general").append(todoDiv);
        todoDiv.append(todoH1);
        todoDiv.append(todoLi);
        todoLi.innerText = out[i].title;
      }
    });

  userNames();
}

function userNames() {
  fetch(urlUsers)
    .then((users) => users.json())
    .then((user) => {
      for (let j = 0; j < numOfusers; j++) {
        const admin = document.querySelectorAll(".userName");
        admin[j].innerHTML = user[j].name;
      }
    });
}

document.getElementById("usersButton").onclick = function () {
  document.getElementById("general").classList.add("wrapper");
  document.getElementById("general").classList.remove("todoListWrapper");
  document.getElementById("general").innerHTML = "";
  document.getElementById("ordered").innerHTML = "";
  document.getElementById("allInOne").innerHTML = "";

  fetchUserInfo();
};

document.getElementById("dotoButton").onclick = function () {
  document.getElementById("general").innerHTML = "";
  document.getElementById("ordered").innerHTML = "";
  document.getElementById("allInOne").innerHTML = "";
  fetchTodoList();
};

window.addEventListener("resize", function () {
  console.log("width:" + this.innerWidth + "height: " + this.innerHeight);
});
