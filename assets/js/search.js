// Variable to store the Google Books API base URL
const googleBooksAPIBaseURL = "https://www.googleapis.com/books/v1/volumes?q=";

//variable to transfer book api object info to info.html page

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
  return `${stringQuery}&maxResults=30`;
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
  document.getElementById("result-entrys").innerHTML = "";

  // Fetch data from the Google Books API
  fetch(googleBooksAPIBaseURL + searchQuery)
    .then((response) => response.json())
    .then((data) => {
      // Process the response data
      displayBooks(data.items);
      console.log(data);
    })
    .catch((error) => {
      console.error("Error fetching data from Google Books API:", error);
    });
  const searchForm = document.getElementById("search-form");
  searchForm.style.display = "none";
}

//Function to display the search results
function displayBooks(books) {
  const resultsDiv = document.getElementById("result-entrys");

  // Loop through the books and create a result entry for each book
  books.forEach((book) => {
    console.log(book);
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
        <img src="${bookImage}" alt="${bookTitle}" />
        <button onclick="showBookDetails('${encodeURIComponent(bookString)
          .replace(/'/g, "%27")
          .replace(/"/g, "%22")
          .replace(/`/g, "%60")}')">Inspect</button>
      `;

    resultsDiv.appendChild(bookEntry);
  });
}

//Function to show book details when the "Inspect" button is clicked-in info.html page
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
