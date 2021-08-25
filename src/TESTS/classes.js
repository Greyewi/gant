//task1

class PrintEditionItem {
  constructor(name, releaseDate, pagesCount, state = 100) {
    this.name = name;
    this.releaseDate = releaseDate;
    this.pagesCount = pagesCount;
    this.state = state;
    this.type = null;
  }

  set State(newState) {
    if (newState > 100) {
      this.state = 100;
    } else if (newState < 0) {
      this.state = 0;
    } else {
      this.state = newState;
    }
  }

  get State() {
    return this.state;
  }

  fix() {
    if (this.state < 100 && this.state > 0) {
      this.State = this.state * 1.5;
    }
  }
}

class Magazine extends PrintEditionItem {
  constructor(name, releaseDate, pagesCount, state = 100) {
    super(name, releaseDate, pagesCount, state);
    this.type = 'magazine';
  }
}

class Book extends PrintEditionItem {
  constructor(author, name, releaseDate, pagesCount, state = 100) {
    super(name, releaseDate, pagesCount, state);
    this.type = 'book';
    this.author = author;
  }
}

class NovelBook extends Book {
  constructor(author, name, releaseDate, pagesCount, state = 100) {
    super(author, name, releaseDate, pagesCount, state);
    this.type = 'novel';
  }
}

class FantasticBook extends Book {
  constructor(author, name, releaseDate, pagesCount, state = 100) {
    super(author, name, releaseDate, pagesCount, state);
    this.author = author
    this.name = name
    this.type = 'fantastic';
  }
}

class DetectiveBook extends Book {
  constructor(author, name, releaseDate, pagesCount, state = 100) {
    super(author, name, releaseDate, pagesCount, state);
    this.type = 'detective';
  }
}

//task2

class Library {
  constructor (name = '') {
    this.name = name;
    this.books = [];
  }

  addBook(book) {
    if (book.state > 30) {
      this.books = [...this.books, book]
    }

  }

  findBookBy(type, value) {
    return this.books.find((book) => book[type] === value) || null
  }

  giveBookByName(bookName) {
    const book = this.books.find((book) => book.name === bookName) || null
    this.books = this.books.filter((book) => book.name !== bookName)
    return book
  }
}

const library = new Library("Библиотека имени Ленина");

library.addBook(
  new DetectiveBook(
    "Артур Конан Дойл",
    "Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе",
    2019,
    1008
  )
);
library.addBook(
  new FantasticBook(
    "Аркадий и Борис Стругацкие",
    "Пикник на обочине",
    1972,
    168
  )
);

library.addBook(new NovelBook("Герберт Уэллс", "Машина времени", 1895, 138));
library.addBook(new Magazine("Мурзилка", 1924, 60));

console.log(library.findBookBy("name", "Властелин колец")); //null
console.log(library.findBookBy("releaseDate", 1924).name); //"Мурзилка"

console.log("Количество книг до выдачи: " + library.books.length); //Количество книг до выдачи: 4
console.log(library.giveBookByName("Машина времени"));
console.log("Количество книг после выдачи: " + library.books.length); //Количество книг после выдачи: 3