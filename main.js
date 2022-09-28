const addButton = document.getElementById('add');
const titleInput= document.getElementById('title');
const authorInput= document.getElementById('author');
const libraryBooksEl = document.querySelector('.library-books');
const errorMsg = document.getElementsByClassName('errorMsg');
const form = document.querySelector('form');

// Empty array to store the books
const box = JSON.parse(localStorage.getItem('books')) || [];


class Library {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  addBook() {
    addButton.addEventListener('click', () => {
        const title = titleInput.value;
        const author = authorInput.value;
      if (title && author) {
        const newBook = {
          title,
          author,
        };
        box.push(newBook);
        localStorage.setItem('box', JSON.stringify(box));
        this.renderBooks();
        form.reset();
        errorMsg.innerHTML = '';
      } else {
        errorMsg.innerHTML = 'Input something';
      }
    });
  }

  renderBooks() {
    if (!box.length) {
      libraryBooksEl.innerHTML = 'No books added';
    } else {
      let markup = '';
      box.forEach((elem, index) => {
        markup += `<div class="library-book" style="background-color: ${index % 2 && 'rgb(225, 223, 223)'}">
        <p class="book-title">"${elem.title}"</p> <span> by </span>
        <p class="book-author">${elem.author}</p>    
        <button type="button" class="btn-rmv" id=${index}>Remove</button>
    </div>`;
      });
      libraryBooksEl.innerHTML = markup;
    }

    const removeBook = () => {
      const removeBtnsEl = [...document.getElementsByClassName('btn-rmv')];
      removeBtnsEl.forEach((item) => {
        item.addEventListener('click', (e) => {
          box.splice(e.target.id, 1);
          localStorage.setItem('bookList', JSON.stringify(box));
          this.renderBooks();
        });
      });
    };
    removeBook();
  }
}

const awesomeBooks = new Library();

awesomeBooks.addBook();
awesomeBooks.renderBooks();