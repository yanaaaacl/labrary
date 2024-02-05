const shelfDisplay = document.querySelector('.shelf-display');
const formNewBook = document.forms["new-book"];


const myLibrary = [];




function Book(title, author, page, read){
  this.title = title;
  this.author = author;
  this.page = page;
  this.read = read;
}

Book.prototype.info = function(){
  if (this.read === true){
    return `${this.title} by ${this.author} , ${this.page} pages , read`;
  } else{
    return `${this.title} by ${this.author} , ${this.page} pages , not read`;
  }
}

function ChangeBook(title, author, page, read){
  this.title = title;
  this.author = author;
  this.page = page;
  this.read = read; 
}

ChangeBook.prototype.changeInfo = function(){
  if (this.read === true){
    this.read = false;
    return `${this.title} by ${this.author} , ${this.page} pages ,not read`;
  } else{
    this.read = true;
    return `${this.title} by ${this.author} , ${this.page} pages , read`;
  }
}

Object.setPrototypeOf(ChangeBook.prototype, Book.prototype);


function addBookToLibrary(title, author, page, read) {
  let book = new ChangeBook(title, author, page, read);
  let shelfCard = document.createElement('div');
    let textTitle = document.createElement('p');
    let btnInfo = document.createElement('button');
  
    textTitle.classList.add('shelf-card--title'); // название книги добавляем
    textTitle.textContent = title;
  
    btnInfo.classList.add('shelf-card--btn'); // кнопка показать информацию о книге
    btnInfo.textContent = 'Show info';

    let desc = document.createElement('p');
    desc.classList.add('description-book');
    desc.textContent = book.info();

    let btnStatus = document.createElement('button');
    btnStatus.classList.add('status-btn');
    btnStatus.textContent = 'no read';
    

    let btnRemove = document.createElement('button');
    btnRemove.classList.add('remove-btn');
    btnRemove.textContent = 'Remove';
  
    shelfCard.classList.add('shelf-card'); // сама полка куда добавляем название и кнопку
    shelfCard.appendChild(textTitle);
    shelfCard.appendChild(btnInfo);
  
    btnInfo.addEventListener('click', () => {
      if (shelfCard.classList.contains('shelf-card')){ // если класс лист такой то
        btnInfo.textContent = 'Hide info'; // значит скрыть инфу
        shelfCard.appendChild(desc);
        shelfCard.appendChild(btnRemove);
        shelfCard.appendChild(btnStatus);
        shelfCard.classList.replace('shelf-card', 'shelf-card--open');
      } else {
        btnInfo.textContent = 'Show info';
        shelfCard.removeChild(desc);
        shelfCard.removeChild(btnRemove);
        shelfCard.removeChild(btnStatus);
        shelfCard.classList.replace('shelf-card--open', 'shelf-card');
      }
    })

    
  
    shelfDisplay.appendChild(shelfCard);

    btnStatus.addEventListener('click', () => {
      desc.textContent = book.changeInfo();
      if(book.read === true){
        btnStatus.textContent = 'no read';
      } else {
        btnStatus.textContent = 'read';
      }
    })

    btnRemove.addEventListener('click', () => {
      shelfDisplay.removeChild(shelfCard);
    })

    
}

// Открывает и закрывает модальное окно

const btnOpenModal = document.querySelector('#btn-open-modal');
const modalBook = document.querySelector('#modal-book');
const modalCancel = document.querySelector('#modal-cancel');

btnOpenModal.addEventListener('click', () => {
  modalBook.showModal();
})

modalCancel.addEventListener('click', () => {
  modalBook.close();
})

// Не отправляем форму на сервер с помощью preventDefault

formNewBook.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = formNewBook.elements['title-book'].value;
  const author = formNewBook.elements['title-author'].value;
  const pages = formNewBook.elements['title-pages'].value;
  const read = formNewBook.elements['read'].value == 'yes';
  addBookToLibrary(title, author, pages, read);
  modalBook.close();
  formNewBook.reset();
});


// Добавляет книги на страницу введенные вручную

addBookToLibrary('xffcvv', 'hhhh', '23', 'read');
addBookToLibrary('bvvvvvv', 'hhhh', '23', 'read');
addBookToLibrary('tttttttt', 'hhhh', '23', 'read');
addBookToLibrary('gggggg', 'hhhh', '23', 'read');
addBookToLibrary('vvvvvvv', 'hhhh', '23', 'read');



