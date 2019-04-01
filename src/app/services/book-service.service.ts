import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs'
import { map } from 'rxjs/Operators'

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {

  constructor(private http: Http) { }

  //get list of books
  getBooks(){
    console.log("inside get books");
    return this.http.get("http://localhost:8085/bookstore/all")
      .pipe(map (( resp ) =>{
        console.log(resp);
        return resp.json();
      }))
  }

  // Add book
  addBook(bookData){
    console.log(bookData);
    return this.http.post("http://localhost:8085/bookstore/add",bookData)
                    .pipe(map((resp) => {
                      console.log(resp);
                      return resp.toString();
                    }))
  }

  //delete Book
  deleteBook(book){
    console.log(book);
    return this.http.delete('http://localhost:8085/bookstore/delete/' + book.book_id)
                    .pipe(map((resp) => {
                      console.log(resp);
                      return resp.toString();
                    }))
  }

  //update Book
  updateBook(bookData){
    console.log(bookData);
    return this.http.put("http://localhost:8085/bookstore/update",bookData)
                    .pipe(map((resp) => {
                      console.log(resp);
                      return resp.toString();
                    }))
  }
}
