import "./style.css";

const ul = document.querySelector("ul");
//on va recuperer les element de notre javascript dans le form
const form = document.querySelector("form");
const input = document.querySelector("form > input");
//on va ajouter un evenement et ecouter quand l'utilisateur submit

const todos = [
  {
    text: "je suis une todo",
    done: false
  },
  {
    text: "faire du javascript",
    done: true
  }
];
//Nous allons ensuite créer un écouteur et 
//le gestionnaire d'événement correspondant :
form.addEventListener("submit", event => {
  event.preventDefault();
  const value = input.value;
  input.value = "";
  addTodo(value);
});
//Nous commençons par empêcher le comportement par défaut qui consiste à envoyer une requête HTTP et à recharger la page, car nous voulons gérer nous-mêmes le comportement. Nous utilisons donc 
//immédiatement la méthode preventDefault().
//puis on recupere la valeur de ,notre champ grace a la propriete value


const displayTodo = () => {
  const todosNode = todos.map((todo, index) => {
    return createTodoElement(todo, index);
  });
  ul.innerHTML = "";
  ul.append(...todosNode);
};

const createTodoElement = (todo, index) => {
  const li = document.createElement("li");
  //Pour chaque todo, nous créons un élément bouton 
  //dont nous stockons la référence dans une constante.
  const buttonDelete = document.createElement("button");
  buttonDelete.innerHTML = "Supprimer";
  //Ensuite, nous ajoutons un écouteur pour l'événement click et nous créons une fonction fléchée 
  //que nous utilisons comme gestionnaire d'événement.
  buttonDelete.addEventListener("click", event => {
    event.stopPropagation();
    deleteTodo(index);
  });
  li.innerHTML = `
    <span class="todo ${todo.done ? "done" : ""}"></span>
    <p>${todo.text}</p>
  `;
  //Ensuite, nous ajours simplement le bouton
  // comme enfant de l'élément de liste li.
  li.appendChild(buttonDelete);
  li.addEventListener("click", event => {
    toggleTodo(index);
  });
  return li;
};

//Ensuite, elles utilise la méthode push() pour ajouter une nouvelle todo à la liste.
//La todo est un objet avec une propriété text qui a pour valeur l'argument text passé, nous utilisons donc le raccourci syntaxique que nous avons appris, et une propriété done qui a la valeur false.
//Enfin, nous appelons la méthode displayTodo() qui va recréer les éléments et les afficher sur le DOM
const addTodo = text => {
  todos.push({
    text,
    done: false
  });
  displayTodo();
};
//creation d'une methode qui va nous permettre de retirer une tODO
//on va recuperer l'index et grace a l'index on va
//on va supprimer l'element d'un array avec la methode slice
//Il ne nous reste qu'à créer la fonction deleteTodo() :
const deleteTodo = index => {
  todos.splice(index, 1);
  displayTodo();
};
const toggleTodo = index => {
  todos[index].done = !todos[index].done;
  displayTodo();
};
displayTodo();