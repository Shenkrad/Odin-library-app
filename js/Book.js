export default class Book {
    constructor(id, title, author, pages, isRead) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }

    info() {
        return(`${this.title} by ${this.author}, ${this.pages}, ${this.isRead ? "read" : "not read yet"}`);
    }
}