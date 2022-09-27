let section=document.getElementById('section');
let bookDiv = document.getElementsByClassName('books');
let addButton = document.getElementById('add');
let title= document.getElementById('title');
let author= document.getElementById('author');
// let errorMsg = document.getElementsByClassName('errorMsg');
// let form = document.querySelector('form');

// Empty array to store the books
let box = [];

// CHECK If There Is Books In Local Storage
if(localStorage.getItem("books")){
  box = JSON.parse(localStorage.getItem("books"));
}

getItemsFromLocalStorage ();
// Add Book

addButton.onclick = function () {
  // event.preventDefault();
  if(title.value !== "" && author.value !== ""){
    addBookToBox(title.value, author.value);
    title.value = "";
    author.value = "";
  }
}

function addBookToBox (titleMsg, authorMsg){
  const book = {
    id: Date.now(),
    title:titleMsg,
    author:authorMsg,
  };
  // Push Books To Box Array
  box.push(book);
  // Add books To page
  addBookToPage(box);
  // Add books To Local Storage
  addDataToLocalStorage(box);
}

const deleteBook = (e) => {
  e.parentElement.parentElement.parentElement.remove();
}

function addBookToPage (box) {
  // Empty Div Books
  // bookDiv.innerHTML = "";
  section.innerHTML = "";

  // Looping On Array Of Books
  box.forEach(book => {
    
    section.innerHTML += `
    <div id='book'>
      <label for="title">${book.title}</label><br>
      <label for="author">${book.author}</label>
      <br><br>
      <div>
        Remove
        <span>
          <!-- <i class="fas fa-edit"></i> -->
          <i onClick="deleteBook(this)" class="fas fa-trash-alt"></i>
        </span>
      </div>
      <hr>
    </div>
    `;
    title.value = '';
    author.value = '';
  });
  
}

function addDataToLocalStorage (box) {
  window.localStorage.setItem("books", JSON.stringify(box));
}
    
function getItemsFromLocalStorage (){
  let data = window.localStorage.getItem("books");
  if (data){
    let books = JSON.parse(data);
    addBookToPage (books);
  }
}