const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
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

function createBookCard(book) {
  const bookListContainer = document.querySelector(".book-list");

  const bookCard = document.createElement("div");
  bookCard.classList.add("book-card");

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
  span.textContent = book.read ? "Read" : "Unread";
  status.appendChild(span);

  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);
  bookCard.appendChild(status);

  bookListContainer.appendChild(bookCard);
}

function createBookList() {
  myLibrary.forEach((book) => createBookCard(book));
}

createBookList();
