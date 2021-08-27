//  Book Class: Represents a Book

class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Class: handle UI Tasks

class UI{
    static displayBooks(){
        const books = store.getBooks; 

        books.forEach((Book) => UI.addBookToList(Book));
    }

    static addBookToList(Book){
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');


        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row)
    }

    static deleteBook(el) {
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        // 

        // make vanish in 3 seconds
        setTimeout(() => {
            document.querySelector('.alert', remove(), 3000);
        }) 
    }

    static clearFields() {
        document.querySelector('#title').Value = '';
        document.querySelector('#author').Value = '';
        document.querySelector('#isbn ').Value = '';
    }
}

// Store Class: Handle Storage
class store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];

        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
    }

    static addBook(Book){
        const books = storage.getBooks();
        books.push(Book);

        localStorage.setItem('books', JOSN.stringify(books));
    }

    static removeBook(isbn){
        const books = store.getBooks();

        books.forEach((Book, index) => {
            if(Book.isbn === isbn){
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JOSN.tringify(books));
    }
}

// Event: Display Books

document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book

document.querySelector('#book-form').addEventListener('submit', (e) => {
    // prevent actual submit
    e.preventDefault();

    // get form values
    const title = document.querySelector('#title').Value;
    const author = document.querySelector('#author').Value;
    const isbn = document.querySelector('#isbn').Value; 

    // Validate
    if(title === '' || author === '' || isbn ===''){
        UI.showAlert("Please fill the all fields!", "danger");
    }else{
        //  Instantiate book
    const book = new Book(title, author, isbn);

    // Add book to UI
    UI.addBookToList(Book);

    // Add book to store
    store.addBook(Book); 

    // show sucess message
    UI.showAlert("Book Added", 'success');

    // clear fields
    UI.clearFields();
    }

});

// Event: Remove a Book

document.querySelector('#book-list').addEventListener('click', (e) => {
    // Remove book from UI
    UI.deleteBook(e.target);

    // Remove book from store
    store.removeBook( e.target.parentElement.previousElementSibling.textContent);

    // show sucess message
    UI.showAlert("Book Removed", 'success');
});




