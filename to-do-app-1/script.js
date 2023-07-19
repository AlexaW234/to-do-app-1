//SCHRITT 1 INITIALIZE TODOS ARRAY
// Todos-Array erstellen + anfangstoDoelements hinzufügen
let todos = [
  { description: "Call Mom", done: false, id: 1 }, 
  { description: "Buy Groceries", done: true, id: 2 }, 

// SCHRITT 2 Variablen anlegen um auf die Htmlelemente zu verweisen
const filters = document.querySelector("#filters"); 
const todoDescription = document.querySelector("#todo-description"); 
const btnAddTodo = document.querySelector("#btn-add-todo"); 
const todosList = document.querySelector("#todos-list"); 

// SCHRITT 3 Event Listener für buttonklicks und Änderungen in Todoslist hinzufügen

btnAddTodo.addEventListener("click", addTodo); 
todosList.addEventListener("change", updateTodo); 

// SCHRITT 4 Todos initial rendern
renderTodos(); 

// SCHRITT 5 Funktion addtodo um neues Todo hinzuzufügen
function addTodo() {
  event.preventDefault();

  const description = todoDescription.value; 

  if (description !== "") {
    const newTodo = {
      description: description,
      done: false
      id: Date.now(), 
    };

    todos.push(newTodo); 
    renderTodos(); 
    todoDescription.value = ""; 
  }
}

// SCHRITT 6 Funktion rendertodos um die todos in Liste anzuzeigen
function renderTodos() {
  todosList.innerHTML = ""; 

  //SCHRITT 6 a) neues Listenelement erstellen
  todos.forEach(function (todo) {
    const listItem = document.createElement("li"); 

    //SCHRITT 6 b) eine Checkbox für den Erledigtstatus erstellen
    const checkbox = document.createElement("input"); 
    checkbox.type = "checkbox"; 
    checkbox.checked = todo.done; 

    // SCHRITT 6 c)  Label für Todo Beschreibung erstellen
    const label = document.createElement("label"); 
    label.innerText = todo.description; 

    //SCHRITT 6 d)Änderungen im Todos-Objekt speichern
    checkbox.addEventListener("change", function () {
      todo.done = checkbox.checked; 
      renderTodos(); 
    });

    //SCHRITT 6 e) Checkbox und Label dem LIstenelement hinzufügen
    listItem.appendChild(checkbox); 
    listItem.appendChild(label); 

    //SCHRITT 6 f) Listenelement zur Todos-Liste hinzufügen
    todosList.appendChild(listItem);
  });
}

// SCHRITT 7 updatetodo function um erledigtenStatus von  den Todos zu aktualisieren
function updateTodo() {
  const id = parseInt(event.target.dataset.id); 

  todos.forEach(function (todo) {
    if (todo.id === id) {
      todo.done = !todo.done; 
      renderTodos(); 
      return;
    }
  });
}
