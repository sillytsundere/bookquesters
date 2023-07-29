// You can implement this function to display more details about the selected book.
    // You may use the Google Books API again to fetch additional details about the book,
    // such as the description, average rating, and more.
    // For simplicity, let's just alert the book ID for now.
    // alert("Book ID: " + bookId);

    var book = localStorage.getItem('inspectedBook');
    console.log(JSON.parse(book));