import {books,categories} from "store.js";

var CONSTANTS={ 'FIRST' : 10 , 'LAST' : 20 }

import {authors} from "store.js"

export class library {
  constructor() {}

  getbook (ID){
    var options = arguments[1];
    if(ID<CONSTANTS.FIRST){ // first book
      return new Object();
    }
    else {
      if(ID>CONSTANTS.LAST) return {book : books[books.length-1]};
     }
    return {
      name: books[ID].name,
      price: books[ID].price,
      hasCategory : options.hasCategory,  
      hasAuthor : authors.books[ID] != undefined ? true : IDoptions.hasAuthor
    };
  }     
  getCategory(book_id) {

    var findCategory= id =>{
      for(var i=0; i<categories.length, ++i){
        if(categories[i].id== id || categories[i].hasBooks==true && categories[i].booksType=="main"){
          return categories[i];
        }
        else {
          return new Object();
        }
      }
    }

    var Category= findCategory (books[book_id][`categoryId`]) ;
    if(Category) {
      return {id: 'category_' + Category};
    }
    else {
      return new Object();
    }
  }
  showMessage (m){
      console.log( m );
  }
}