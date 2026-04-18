const myLibrary = [];

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const checkInput = document.getElementById("check");
const tableBody = document.querySelector("#display tbody");

window.addEventListener("load", function () {
  populateStorage();
  render();
});

function populateStorage() {
  if (myLibrary.length === 0) {
    const book1 = new Book("Robinson Crusoe", "Daniel Defoe", 252, true);
    const book2 = new Book("The Old Man and the Sea", "Ernest Hemingway", 127, true);
    myLibrary.push(book1, book2);
  }
}

function submit() {
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const pagesValue = parseInt(pagesInput.value, 10);

  if (title === "" || author === "" || isNaN(pagesValue) || pagesValue <= 0) {
    alert("Please enter a valid title, author, and a whole number of pages (1 or more).");
    return;
  }

  const book = new Book(title, author, pagesValue, checkInput.checked);
  myLibrary.push(book);
  
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  checkInput.checked = false;
  
  render();
}

function Book(title, author, pages, check) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.check = check;
}

function render() {
  tableBody.innerHTML = "";

  myLibrary.forEach((book, i) => {
    const row = tableBody.insertRow();
    
    row.insertCell(0).textContent = book.title;
    row.insertCell(1).textContent = book.author;
    row.insertCell(2).textContent = book.pages;

    const wasReadCell = row.insertCell(3);
    const changeBut = document.createElement("button");
    changeBut.className = "btn btn-success";
    changeBut.textContent = book.check ? "Yes" : "No";
    changeBut.onclick = () => {
      book.check = !book.check;
      render();
    };
    wasReadCell.appendChild(changeBut);

    const deleteCell = row.insertCell(4);
    const delBut = document.createElement("button");
    delBut.className = "btn btn-warning";
    delBut.textContent = "Delete";
    delBut.onclick = () => {
      myLibrary.splice(i, 1);
      render();
    };
    deleteCell.appendChild(delBut);
  });
}