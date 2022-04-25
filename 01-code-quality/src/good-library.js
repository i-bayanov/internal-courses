import { books, categories, authors } from 'store.js';

const CONSTANTS = { FIRST: 10, LAST: 20 };

export class Library {
  getBook(id, ...options) {
    if (id < CONSTANTS.FIRST) {
      // first book
      return {};
    }

    if (id > CONSTANTS.LAST) {
      return { book: books[books.length - 1] };
    }

    return {
      name: books[id].name,
      price: books[id].price,
      hasCategory: options.hasCategory,
      hasAuthor: authors.books[id] !== undefined ? true : options[0].hasAuthor,
    };
  }

  getCategory(bookId) {
    const findCategory = (id) => {
      for (let i = 0; i < categories.length; i++) {
        if (
          categories[i].id === id
          || (categories[i].hasBooks === true
            && categories[i].booksType === 'main')
        ) {
          return categories[i];
        }
      }

      return {};
    };

    const category = findCategory(books[bookId].categoryId);

    if (category) {
      return { id: `category_${category}` };
    }

    return {};
  }

  showMessage(m) {
    console.log(m);
  }
}
