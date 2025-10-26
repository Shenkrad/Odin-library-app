let myLibrary = [];

const btnNewBook = document.querySelector("#btn-new-book");
const btnCancelNewBook = document.querySelector("#cancel-new-book");
const dialog = document.querySelector("#dialog-new-book");
const form = document.querySelector("#form-new-book");

btnNewBook.addEventListener("click", () => dialog.showModal());
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form));
    data.book_read = !!data.book_read;
    createBookCard(addBookToLibrary(data.book_title, data.book_author, data.book_pages, data.book_read));
    
    dialog.close();
});

btnCancelNewBook.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.close();
});


function Book(id, title, author, pages, isRead) {
    if (!new.target) {
        throw Error("User new operator to call the constructor");
    }

    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;

    this.info = function() {
        return(`${this.title} by ${this.author}, ${this.pages}, ${this.isRead ? "read" : "not read yet"}`);
    }
}

function addBookToLibrary(title, author, pages, isRead) {
    const newBook = new Book(crypto.randomUUID(), title, author, pages, isRead);
    myLibrary.push(newBook);
    return newBook;
}

function createBookCard(book) {
    const container = document.querySelector(".container");

    // create card container
        const card = document.createElement("div");
        card.classList.add("book-card");
        card.dataset.id = book.id;

        // card header
        const header = document.createElement("div");
        header.classList.add("book-card-header");

        // create title
        const title = document.createElement("h2");
        title.classList.add("book-title");
        title.textContent = book.title;
        
        // remove button
        const btnRemove = document.createElement("button");
        btnRemove.classList.add("book-btn-remove");
        btnRemove.textContent = "X";

        // create author
        const author = document.createElement("p");
        author.classList.add("book-author");
        author.textContent = `by: ${book.author}`;

        // create pages
        const pages = document.createElement("p");
        pages.classList.add("book-pages");
        pages.textContent = `pages: ${book.pages}`;

        // create read
        const read = document.createElement("p");
        read.classList.add("book-read");
        read.textContent = "Read: ";

        // create checkbox
        const readCheckbox = document.createElement("input");
        readCheckbox.type = "checkbox";
        readCheckbox.checked = book.isRead;

        // append childs
        read.appendChild(readCheckbox);

        header.appendChild(title);
        header.appendChild(btnRemove);

        card.appendChild(header);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(read);

        // add to the document
        container.appendChild(card);

        //event listeners

        btnRemove.addEventListener("click", (e) => {
            removeBook(card);
        });

        readCheckbox.addEventListener("change", (e) => {
            book.isRead = e.target.checked;
        });
}

function showAllBooks() {
    myLibrary.forEach(book => {
        createBookCard(book);
    });
}

function removeBook(card) {
    myLibrary = myLibrary.filter(book => book.id !== card.dataset.id);
    card.remove();
}

// a few examples
addBookToLibrary("The Lord of the Rings", "J.R.R. Tolkien", 1077, true);
addBookToLibrary("The Final Empire", "Brandon Sanderson", 541, true);
addBookToLibrary("The Well of Ascension", "Brandon Sanderson", 590, false);
addBookToLibrary("Foundation", "Isaac Asimov", 255, true);

showAllBooks();