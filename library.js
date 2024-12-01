const myLibrary = [];

/*Constructs the book object with a title, author, number of pages and whether it has been read by the user*/
function Book(title, author, numPages, hasRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.hasRead = hasRead;

    this.info = function() {
        let readResult;
        /*Displays text based on whether the user has read the current book*/
        if(hasRead){
            readResult = "has read already";
        } else{
            readResult = "has not read";
        }

        return `${this.title} by ${this.author}, ${this.numPages} pages, ${readResult}`;
    };
}


/*Adds a book to the library array*/
function addBookToLibrary(title, author, numPages, hasRead) {
    const book = new Book(title, author, numPages, hasRead);
    myLibrary.push(book);
}

//Get the HTML elements which we will add elements to on run time
const bookContainer = document.querySelector(".book_container");

/*Displays the books added on the DOM*/
function displayBooks() {
    for(let i = 0; i < myLibrary.length; i++){
        //Add each book to their own card. This card element will make a container which containers a paragraph, a remove and a status button
        const bookContent = document.createElement("p");
        bookContent.classList.add("content");
        bookContent.textContent = myLibrary[i].info();
        console.log(myLibrary[i].info());
        bookContainer.appendChild(bookContent);
    }
}

addBookToLibrary("Something", "Rather", 250, false);
addBookToLibrary("More", "Money", 250, false);
addBookToLibrary("Dingle", "Bob", 250, false);
addBookToLibrary("Kyojuro", "Rengoku", 250, false);
displayBooks();

//Get the popup div for displaying the popup
const popupForm = document.getElementById("pop_container");
//Add a click event listener for the add book button
const buttonAdd = document.querySelector("#add_book");
buttonAdd.addEventListener("click", e => popupForm.style.display = "block");

popupForm.addEventListener('submit', (event) => {
    // stop form submission
    event.preventDefault();
});


