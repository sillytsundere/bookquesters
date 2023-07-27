//all variables declared at the top
var welcomeSctn = document.getElementById('welcome');

//button selectors
var getStarted = document.getElementById('start-btn');
var searchLink = document.getElementById('search-link');

//function to hide welcome section and display search page when search link in nav-bar is clicked
getStarted.addEventListener('click', function(){
    window.location.assign('search.html');
})