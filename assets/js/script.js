//all variables declared at the top
var welcomeSctn = document.getElementById('welcome');

//button selectors
var getStarted = document.getElementById('start-btn');

//function to take user from welcome page to about me page


//function to hide welcome screen and display search screen
getStarted.addEventListener('click', function() {
    welcomeSctn.setAttribute('style', 'display:none');
})