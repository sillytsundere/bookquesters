//all variables declared at the top
var welcomeSctn = document.getElementById('welcome');

//button selectors
var getStarted = document.getElementById('start-btn');
var aboutBtn = document.getElementById('about-btn');
var randomBtn = document.getElementById('random-button');
var randomSection = document.getElementById('random-list');



function getRandomBooks() {
    var apiURL = `https://openlibrary.org/search.json?q=the`;

    fetch(apiURL)
      .then(function (res) {
        return res.json();
      })
      .then((data) => {
        //create section to print 10 random books
        var randomList = document.createElement('ul');
        randomSection.append(randomList);

        //for loop grabs random number to pull from data array and takes book title and author from that pull and prints them in a li that is appended to the randomList ul element to present 
        for(var i = 0; i < 10; i++) {
            var randBook = Math.floor(Math.random() * data.docs.length);
            var randTitle = data.docs[randBook].title;
            var randAuthor = data.docs[randBook].author_name[0];
            var randomEl = document.createElement('li');
            randomEl.textContent = randTitle + ' by ' + randAuthor;
            randomList.appendChild(randomEl);
            //add button that will "add boot to user list"
        }
      })     
}

randomBtn.addEventListener('click', function() {
    getRandomBooks();
})

//takes user to about page when about button is clicked
aboutBtn.addEventListener('click', function() {
    window.location.assign('about.html');
})

//function to take user to search page when search link in nav-bar is clicked
getStarted.addEventListener('click', function(){
    window.location.assign('search.html');
})