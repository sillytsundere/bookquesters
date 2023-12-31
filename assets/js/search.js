// Variable to store the Google Books API base URL
const googleBooksAPIBaseURL = "https://www.googleapis.com/books/v1/volumes?q=";

//formats user input to be able to concat the search terms appropriately into API URL query
function formatVariable(value) {
  if (value) {
    var newValue = value.trim().replace(/ /g, "+");
    return newValue;
  }
}

//function generates string query to be added to api url
//if statements check for which inputs user has searched for in the form
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
  return `${stringQuery}&maxResults=30`;
}

// Function to handle the form submission, places user inputs into variables and calls function to format the query and fetch from API
function handleFormSubmit(event) {
  event.preventDefault();

  // Get the values entered by the user in the search form
  const author = document.getElementById("author").value;
  const title = document.getElementById("title").value;
  const language = document.getElementById("language").value;
  const genre = document.getElementById("genre").value;

  // Create the search query based on the user's inputs
  const searchQuery = formatStringQuery(genre, author, title, language);

  // Call the function to fetch data from Google Books API
  fetchBooksFromAPI(searchQuery);
}

// Function to fetch books from the Google Books API
function fetchBooksFromAPI(searchQuery) {
  // Clear previous search results
  document.getElementById("result-entrys").innerHTML = "";

  // Fetch data from the Google Books API
  fetch(googleBooksAPIBaseURL + searchQuery)
    .then((response) => response.json())
    .then((data) => {
      // Process the response data
      displayBooks(data.items);
    })
    .catch((error) => {
      //prints error message in console in case there was an error fetching from api
      console.error("Error fetching data from Google Books API:", error);
    });
}

//Function to display the search results
function displayBooks(books) {
  const resultsDiv = document.getElementById("result-entrys");

  // Loop through the books and create a result entry for each book
  books.forEach((book) => {
    const bookInfo = book.volumeInfo;
    const bookTitle = bookInfo.title;
    const bookAuthor = bookInfo.authors;
    const bookImage =
      bookInfo.imageLinks?.thumbnail || "https://via.placeholder.com/128x192"; // Use a placeholder image if no thumbnail is available
    const bookString = JSON.stringify(book);
    const bookEntry = document.createElement("div");
    bookEntry.setAttribute("id", "book-entry");
    bookEntry.innerHTML = `
        <a href="${
          bookInfo.previewLink
        }" target="_blank">${bookTitle}</a><a> by ${bookAuthor}</a>
        <div class="picture-inspect">
        <img src="${bookImage}" alt="${bookTitle}" />
        <button onclick="showBookDetails('${encodeURIComponent(bookString)
          .replace(/'/g, "%27")
          .replace(/"/g, "%22")
          .replace(/`/g, "%60")}')">Inspect</button>
        </div>
      `;

    resultsDiv.appendChild(bookEntry);
  });
}

//Function to show book details when the "Inspect" button is clicked-in info.html page
//it saves the clicked book object to local storage to be grabbed by the info.html page once taken there after inspect button is clicked
function showBookDetails(book) {
  var decodedBookString = decodeURIComponent(
    book.replaceAll("%27", "'").replaceAll("%22", '"').replaceAll("%60", "`")
  );
  console.log(decodedBookString);
  localStorage.setItem("inspectedBook", decodedBookString);
  setTimeout(() => {
    window.location.assign("info.html");
  }, 100);
}

// Add event listener to the form to handle form submission
const searchForm = document.querySelector("form");
searchForm.addEventListener("submit", handleFormSubmit);
