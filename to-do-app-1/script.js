//SCHRITT 1 INITIALIZE TODOS ARRAY
// Todos-Array erstellen + anfangstoDoelements hinzufügen
let todos = [
  { description: "Call Mom", done: false, id: 1 }, // To DO nr 1: Call Mom
  { description: "Buy Groceries", done: true, id: 2 }, // Todo 2 : Groceries
];

// SCHRITT 2 Variablen anlegen um auf die Htmlelemente zu verweisen
const filters = document.querySelector("#filters"); // Filters-Element abrufen
const todoDescription = document.querySelector("#todo-description"); // field für die Todo-Beschreibung abrufen
const btnAddTodo = document.querySelector("#btn-add-todo"); //Variable für Button zum adden von todos definieren
const todosList = document.querySelector("#todos-list"); // Variable für todoliste  erhalten

// SCHRITT 3 Event Listener für buttonklicks und Änderungen in Todoslist hinzufügen
btnAddTodo.addEventListener("click", addTodo); //wenn auf  Button klicken, fügen ein neues Todo hinzu

todosList.addEventListener("change", updateTodo); // adden des Event Listeners für die Änderungen in der Liste

// SCHRITT 4 Todos initial rendern
renderTodos(); // alle vorhandenen todos auf seite anzeigen

// SCHRITT 5 Funktion addtodo um neues Todo hinzuzufügen
function addTodo() {
  event.preventDefault();

  const description = todoDescription.value; // eingegeben Text aus dem textfeld erfassen und dann in description variable speichern

  if (description !== "") {
    const newTodo = {
      description: description,
      done: false,
      id: Date.now(), // jedes todo enthält ne eindeutige ID
    };

    todos.push(newTodo); // Neues Todo zum Array hinzufügen
    renderTodos(); // aktualisieren Anzeige um nen neues todo anzuzeigen
    todoDescription.value = ""; // textfeld leeren
  }
}

// SCHRITT 6 Funktion rendertodos um die todos in Liste anzuzeigen
function renderTodos() {
  todosList.innerHTML = ""; // alle vorhandenen todos aus liste entfernen

  //SCHRITT 6 a) neues Listenelement erstellen
  todos.forEach(function (todo) {
    const listItem = document.createElement("li"); //1  neues Listenelement erstellt

    //SCHRITT 6 b) eine Checkbox für den Erledigtstatus erstellen
    const checkbox = document.createElement("input"); // Checkbox für erledigt sstatus erstellen
    checkbox.type = "checkbox"; // Checkbox-Typ auf checkbox setzen
    checkbox.checked = todo.done; // Status der checkbox entsprechend dem Status des Todos erstellen

    // SCHRITT 6 c)  Label für Todo Beschreibung erstellen
    const label = document.createElement("label"); // Label für die Todo-Beschreibung erstellen
    label.innerText = todo.description; //  todo Beschreibung setzen

    //SCHRITT 6 d)Änderungen im Todos-Objekt speichern
    checkbox.addEventListener("change", function () {
      todo.done = checkbox.checked; // Änderungen im Todos-Objekt speichern
      renderTodos(); // wieder todos rendern
    });

    //SCHRITT 6 e) Checkbox und Label dem LIstenelement hinzufügen
    listItem.appendChild(checkbox); // Checkbox dem Listenelement adden
    listItem.appendChild(label); // Label dem Listenelement adden

    //SCHRITT 6 f) Listenelement zur Todos-Liste hinzufügen
    todosList.appendChild(listItem);
  });
}

// SCHRITT 7 updatetodo function um erledigtenStatus von  den Todos zu aktualisieren
function updateTodo() {
  const id = parseInt(event.target.dataset.id); // ID vom geänderten Todos abrufen

  todos.forEach(function (todo) {
    if (todo.id === id) {
      todo.done = !todo.done; // SCHRITT 7 a) donestatus des Todos umschalten
      renderTodos(); // Todos erneut rendern
      return;
    }
  });
}
