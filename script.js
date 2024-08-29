const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.index = myLibrary.length;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.read ? "reading" : "not read yet"
    }`;
  };
}

Book.prototype.setRead = function () {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  return newBook;
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true);
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, true);
addBookToLibrary("Moby-Dick", "Herman Melville", 635, false);

function removeBook(index) {
  myLibrary.splice(index, 1);
}

function handleRemoveBook(index) {
  removeBook(index);
  const bookListContainer = document.querySelector(".book-list");
  const book = document.querySelector(`.book-card[data-index="${index}"]`);
  bookListContainer.removeChild(book);
}

function getStatusText(book) {
  return book.read ? "Read" : "Not read yet";
}

function createBookCard(book) {
  const bookListContainer = document.querySelector(".book-list");

  const bookCard = document.createElement("div");
  bookCard.classList.add("book-card");
  bookCard.dataset.index = book.index;

  // show title
  const title = document.createElement("h2");
  title.classList.add("book-title");
  title.textContent = book.title;

  // show author
  const author = document.createElement("div");
  author.classList.add("book-author");
  author.textContent = `by ${book.author}`;

  // show pages
  const pages = document.createElement("div");
  pages.classList.add("book-pages");
  pages.textContent = `${book.pages | 0} pages`;

  // show read status
  const status = document.createElement("div");
  status.classList.add("book-status");
  status.textContent = "Status: ";
  const span = document.createElement("span");
  span.textContent = getStatusText(book);

  // edit read status
  const editButton = document.createElement("button");
  editButton.classList.add("edit-read-button");
  const editIcon = document.createElement("img");
  editIcon.src = "images/edit.svg";
  editIcon.alt = "Edit Icon";
  editButton.appendChild(editIcon);
  editButton.addEventListener("click", () => {
    book.setRead();
    span.textContent = getStatusText(book);
  });

  status.appendChild(span);
  status.appendChild(editButton);

  // delete button
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-book-button");
  const deleteIcon = document.createElement("img");
  deleteIcon.src = "images/trash.svg";
  deleteIcon.alt = "Delete Icon";
  deleteButton.appendChild(deleteIcon);
  deleteButton.addEventListener("click", () => handleRemoveBook(book.index));

  // card-header
  const header = document.createElement("div");
  header.classList.add("card-header");
  header.appendChild(title);
  header.appendChild(deleteButton);

  bookCard.appendChild(header);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);
  bookCard.appendChild(status);

  bookListContainer.appendChild(bookCard);
}

function createBookList() {
  myLibrary.forEach((book) => createBookCard(book));
}

const bookForm = document.querySelector(".book-form");

function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
  document.getElementById("true").checked = false;
}

function showBookForm() {
  clearForm();
  bookForm.style.display = "flex";
}

function closeBookForm() {
  clearForm();
  bookForm.style.display = "none";
}

function handleCreateBook(event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = Boolean(document.getElementById("true").checked);

  if (title && author && pages) {
    const newBook = addBookToLibrary(title, author, pages, read);
    createBookCard(newBook);
    clearForm();
    closeBookForm();
  }
}

document
  .querySelector(".book-form form")
  .addEventListener("submit", handleCreateBook);
document
  .querySelector(".create-new-book-button")
  .addEventListener("click", showBookForm);
document
  .getElementById("close-form-button")
  .addEventListener("click", closeBookForm);

createBookList();
