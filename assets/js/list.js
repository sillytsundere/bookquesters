var storedList = JSON.parse(localStorage.getItem('myBooks'));
var listEl = document.getElementById('my-list');
var deletedCount = 0;

for (var i = 0; i < storedList.myBooks.length; i++) {
    var listItem = document.createElement('li');
    if (storedList.myBooks[i].volumeInfo.authors) {
    listItem.innerHTML = `${storedList.myBooks[i].volumeInfo.title} by ${storedList.myBooks[i].volumeInfo.authors[0]}`;
    } else {
        listItem.innerHTML = `${storedList.myBooks[i].volumeInfo.title}`
    }
    var removeBtn = document.createElement('button');
    removeBtn.addEventListener('click', removeBook);
    removeBtn.innerHTML = "Remove from List";
    removeBtn.id = i; 
    listEl.appendChild(listItem);
    listItem.appendChild(removeBtn);
}

function removeBook(event) {
    var rmvStoredList = JSON.parse(localStorage.getItem('myBooks'));
    const parent = event.target.parentElement; //li
    var grandma = parent.parentElement; //ul
    for (var i = parseInt(event.target.id) + 1; i < grandma.children.length; i++){
        var bookElement = grandma.children[i];
        var bookId = i - 1;
        bookElement.children[0].id = bookId;
        }
    parent.remove();
    rmvStoredList.myBooks.splice(event.target.id, 1);
    localStorage.setItem('myBooks', JSON.stringify(rmvStoredList));
}