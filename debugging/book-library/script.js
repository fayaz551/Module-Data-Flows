let myLibrary = [];

window.addEventListener("load", function (e) {
  populateStorage();
  render();
});

function populateStorage() {
  if (myLibrary.length == 0) {
    let book1 = new Book("Robinson Crusoe", "Daniel Defoe", "252", true);
    let book2 = new Book(
      "The Old Man and the Sea",
      "Ernest Hemingway",
      "127",
      true
    );
    myLibrary.push(book1);
    myLibrary.push(book2);
    // render() is called in the window load listener, so no need to call it here twice
  }
}

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const checkInput = document.getElementById("check");

function submit() {
  // Bug fix: Check all fields including author
  if (
    titleInput.value === "" ||
    authorInput.value === "" ||
    pagesInput.value === ""
  ) {
    alert("Please fill all fields!");
    return false;
  } else {
    // Bug 3 Fix: Changed second argument from titleInput.value to authorInput.value
    let book = new Book(titleInput.value, authorInput.value, pagesInput.value, checkInput.checked);
    
    // Bug 2 Fix: Changed 'library.push' to 'myLibrary.push'
    myLibrary.push(book);
    
    // Clear inputs after submit
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    checkInput.checked = false;
    
    render();
  }
}

function Book(title, author, pages, check) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.check = check;
}

function render() {
  let table = document.getElementById("display");
  let rowsNumber = table.rows.length;

  // Bug Fix: Added missing closing parenthesis in the for-loop header
  for (let n = rowsNumber - 1; n > 0; n--) {
    table.deleteRow(n);
  }

  let length = myLibrary.length;
  for (let i = 0; i < length; i++) {
    let row = table.insertRow(-1); // Changed to -1 to append at the end
    let titleCell = row.insertCell(0);
    let authorCell = row.insertCell(1);
    let pagesCell = row.insertCell(2);
    let wasReadCell = row.insertCell(3);
    let deleteCell = row.insertCell(4);

    titleCell.innerHTML = myLibrary[i].title;
    authorCell.innerHTML = myLibrary[i].author;
    pagesCell.innerHTML = myLibrary[i].pages;

    // Read/Unread Button Logic
    let changeBut = document.createElement("button");
    changeBut.className = "btn btn-success";
    wasReadCell.appendChild(changeBut);
    
    // Bug 5 Fix: Reversed the logic. If check is true, status is "Yes"
    changeBut.innerText = myLibrary[i].check ? "Yes" : "No";

    changeBut.addEventListener("click", function () {
      myLibrary[i].check = !myLibrary[i].check;
      render();
    });

    // Bug 4 Fix: Corrected variable names (delButton vs delBut) and event listener name ("click")
    let delBut = document.createElement("button");
    delBut.className = "btn btn-warning";
    delBut.innerHTML = "Delete";
    deleteCell.appendChild(delBut);
    
    delBut.addEventListener("click", function () {
      alert(`You've deleted title: ${myLibrary[i].title}`);
      myLibrary.splice(i, 1);
      render();
    });
  }
}