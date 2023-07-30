// You can implement this function to display more details about the selected book.
// You may use the Google Books API again to fetch additional details about the book,
// such as the description, average rating, and more.
// For simplicity, let's just alert the book ID for now.
// alert("Book ID: " + bookId);

var book = JSON.parse(localStorage.getItem('inspectedBook'));
console.log(book);

var bookDisplay = document.getElementById('book-display');
var addBtn = document.getElementById('add');
var myBooks = [];

function displayInfo() {
    //following variables select html elements to display book information on the info.html page so user can learn about book
    var titleDisplay = document.getElementById('title-display');
    titleDisplay.innerHTML = book.volumeInfo.title;
    var authorDisplay = document.getElementById('author-display');
    authorDisplay.innerHTML = book.volumeInfo.authors;
    var description = document.getElementById('description');
    description.innerHTML = `Description: ${book.volumeInfo.description}`;
    var lang = document.getElementById('language');
    lang.innerHTML = `Language: ${book.volumeInfo.language}`;
    var genre = document.getElementById('category');
    genre.innerHTML = `Genre: ${book.volumeInfo.categories}`;
    var pageCount = document.getElementById('page-num');
    pageCount.innerHTML = `Page Count: ${book.volumeInfo.pageCount}`;
    var rating = document.getElementById('rating');
    rating.innerHTML = `Average Rating: ${book.volumeInfo.averageRating}`;
    //following code displays the cover thumbnail and created img tag to store it in along with alt text
    var cover = document.getElementById('book-cover');
    var coverImg = book.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/128x192"
    cover.innerHTML = `<img src="${coverImg}" alt="Cover thumbnail for ${book.volumeInfo.title}">`;
}


addBtn.addEventListener("click", addToList);

function addToList () {

    var title = document.getElementById('title-display').innerHTML;
    var author = document.getElementById('author-display').innerHTML;

    var newBook = {
        title: title,
        author: author
    };
    console.log(newBook);

    var parsedBooks = JSON.parse(localStorage.getItem('myBooks'));
    console.log(parsedBooks);

    if (!parsedBooks){
        var initialBook = {
            myBooks: []
        }
        initialBook.myBooks.push(newBook);
        localStorage.setItem('myBooks', JSON.stringify(parsedBooks));
    } else {
        parsedBooks.myBooks.push(newBook);
        localStorage.setItem('myBooks', JSON.stringify(parsedBooks));
    }
    console.log(JSON.parse(localStorage.getItem('myBooks')));
}

displayInfo();