  
  // Variable to store the Google Books API base URL
  const googleBooksAPIBaseURL = "https://www.googleapis.com/books/v1/volumes?q=";
  
  function formatVariable(value) {
    if (value) {
      var newValue = value.trim().replace(/ /g, "+");
      return newValue;
    }
  }
  
  function formatStringQuery(genre, author, title, language) {
    var stringQuery = "";
    if (genre) {
      stringQuery += `${formatVariable(genre)}+subject:${formatVariable(genre)}`;
    }
    if (author) {
      if (stringQuery) {
        stringQuery += `&`;
      }
      stringQuery += `inauthor:${formatVariable(author)}`;
    }
    if (title) {
      if (stringQuery) {
        stringQuery += `&`;
      }
      stringQuery += `intitle:${formatVariable(title)}`;
    }
    if (language) {
      if (stringQuery) {
        stringQuery += `&`;
      }
      stringQuery += `langRestrict=${language}`;
    }
    return `${stringQuery}&maxResults=30`
  }

  // Function to handle the form submission
  function handleFormSubmit(event) {
    event.preventDefault();
  
    // Get the values entered by the user in the search form
    const author = document.getElementById("author").value;
    const title = document.getElementById("title").value;
    const language = document.getElementById("language").value;
    const genre = document.getElementById("genre").value;
    console.log(genre);

    // Create the search query based on the user's inputs
    const searchQuery = formatStringQuery(genre, author, title, language);
  
    // Call the function to fetch data from Google Books API
    fetchBooksFromAPI(searchQuery);
  }
  
  // Function to fetch books from the Google Books API
  function fetchBooksFromAPI(searchQuery) {
    // Clear previous search results
    document.getElementById("results").children[1].innerHTML = "";
  
    // Fetch data from the Google Books API
    fetch(googleBooksAPIBaseURL + searchQuery)
      .then((response) => response.json())
      .then((data) => {
        // Process the response data
        //displayBooks(data.items);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data from Google Books API:", error);
      });
  }
  
  // Function to display the search results
  // function displayBooks(books) {
  //   const resultsDiv = document.getElementById("results");
  
  //   // Loop through the books and create a result entry for each book
  //   books.forEach((book) => {
  //     const bookInfo = book.volumeInfo;
  //     const bookTitle = bookInfo.title;
  //     const bookImage = bookInfo.imageLinks?.thumbnail || "https://via.placeholder.com/128x192"; // Use a placeholder image if no thumbnail is available
  
  //     const bookEntry = document.createElement("div");
  //     bookEntry.innerHTML = `
  //       <a href="${bookInfo.previewLink}" target="_blank">${bookTitle}</a>
  //       <img src="${bookImage}" alt="${bookTitle}" />
  //       <button onclick="showBookDetails('${book.id}')">Inspect</button>
  //     `;
  
  //     resultsDiv.appendChild(bookEntry);
  //   });
  // }
  
  // Function to show book details when the "Inspect" button is clicked
  function showBookDetails(bookId) {
    // You can implement this function to display more details about the selected book.
    // You may use the Google Books API again to fetch additional details about the book,
    // such as the description, average rating, and more.
    // For simplicity, let's just alert the book ID for now.
    alert("Book ID: " + bookId);
  }
  
  // Add event listener to the form to handle form submission
  const searchForm = document.querySelector("form");
  searchForm.addEventListener("submit", handleFormSubmit);
  
