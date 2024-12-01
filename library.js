const myLibrary = [];

function Book(title, author, numPages, hasRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.hasRead = hasRead;

    this.info = function() {
        let readResult;
        if(hasRead){
            readResult = "has read already";
        } else{
            readResult = "has not read";
        }
        
        return `${this.title} by ${this.author}, ${this.numPages} pages, ${readResult}`;
    };
}

function addBookToLibrary(title, author, numPages, hasRead) {
    const book = new Book(title, author, numPages, hasRead);
    myLibrary.push(book);
}
