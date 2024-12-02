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
        if(this.hasRead){
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
        const bookContent = document.createElement("div");
        bookContent.classList.add("content");
        //Sets the attribute to match the index of the card so removing it will be easier.
        bookContent.setAttribute("card", i);
        bookContainer.appendChild(bookContent);

        //Add an internal paragrpah so it can be changed
        const text = document.createElement("p");
        text.classList.add("textContent");
        text.textContent = myLibrary[i].info();
        bookContent.appendChild(text);

        //Add a div so the buttons are easier to align side by side
        const div = document.createElement("div");
        div.classList.add("divButtons");
        bookContent.appendChild(div);

        //add the remove button to the created books
        const buttonRemove = document.createElement("button");
        buttonRemove.textContent = "Remove";
        buttonRemove.classList.add("remove");
        buttonRemove.setAttribute("removePos", i);
        div.appendChild(buttonRemove);

        //Set an event listener on every books remove button
        buttonRemove.addEventListener("click", () => {
            removeBook(buttonRemove.getAttribute("removePos"));
            text.textContent = myLibrary[i].info();
        });

        //Add the adjust button for whether the book is read and adjust it using the new prototype method
        const buttonReadTrue = document.createElement("button");
        buttonReadTrue.textContent = "Has Read";
        buttonReadTrue.classList.add("read");
        buttonReadTrue.setAttribute("tf", "true");
        div.appendChild(buttonReadTrue);

      //Update the specific book instance when the "Has Read" button is clicked
        buttonReadTrue.addEventListener("click", () => {
            myLibrary[i].bookIsRead(true);
            text.textContent = myLibrary[i].info();
        });

        //Add the "Has Not Read" button
        const buttonReadFalse = document.createElement("button");
        buttonReadFalse.textContent = "Has Not Read";
        buttonReadFalse.classList.add("not-read");
        buttonReadFalse.setAttribute("tf", "false");
        div.appendChild(buttonReadFalse);

        //Update the specific book instance when the "Has Not Read" button is clicked
        buttonReadFalse.addEventListener("click", () => {
            myLibrary[i].bookIsRead(false);
            text.textContent = myLibrary[i].info();
        });
    }
}

//Get the popup div for displaying the popup
const popupForm = document.getElementById("pop_container");
//Get the actual form
const form = document.querySelector("form");
//Add a click event listener for the add book button
const buttonAdd = document.querySelector("#add_book");
buttonAdd.addEventListener("click", e => popupForm.style.display = "block");

const buttonSubmit = document.getElementById("submit");
buttonSubmit.addEventListener("click", event => {
    event.preventDefault();
     //Get the form input values
     const title = document.getElementById("title").value; 
     const author = document.getElementById("author").value;
     const numPages = parseInt(document.getElementById("numPages").value, 10);
     const selectedOption = document.querySelector('input[name="read"]:checked').id;
     let hasRead = false;
     if (selectedOption === "read-yes") {
        hasRead = true;
     } 
 
     //Add the new book to the library
     addBookToLibrary(title, author, numPages, hasRead);
     //Reset the form so it is cleared of any input
    form.reset();

     //Close the popup and update the displayed books
     popupForm.style.display = "none";
     bookContainer.innerHTML = "";  // Clear the container to avoid duplications
     displayBooks();
});

function removeBook(index) {
    myLibrary.splice(index, 1);
    
     //Find the specific book card to remove from the DOM
     const bookCard = document.querySelector(`[card="${index}"]`);
     if (bookCard) {
         bookCard.remove();
     }

     bookContainer.innerHTML = "";
     displayBooks();
}

//Add a function to the Book object so we can adjust whether the book is read
Book.prototype.bookIsRead = function(isRead) {
    this.hasRead = isRead;
}
