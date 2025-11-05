import Book from './Book.js'

export default class Library {
    static #books = [];

    static addBookToLibrary(title, author, pages, isRead) {
        const newBook = new Book(crypto.randomUUID(), title, author, pages, isRead);
        this.#books.push(newBook);
        return newBook;
    }

    static get books() {
        return this.#books;
    }

    static removeBook(id) {
        this.#books = this.#books.filter(book => book.id !== id);
    }
}