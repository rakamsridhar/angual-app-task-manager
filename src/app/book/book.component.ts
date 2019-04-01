import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { BookServiceService } from 'src/app/services/book-service.service'

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  book_id:string;
  title:string;
  price:string;
  volume:string;
  publishedDate: any;
  
  
  isChecked:boolean = false;
  isSaved:boolean = false;
  isUpdated:boolean = false;
  isDeleted:boolean = false;

  bookList:[1000];
  
 selectedBook: BookComponent;

  constructor(private bookService:BookServiceService) {
    console.log("inside constructor");
   }

   // automatically called by Angular ( On Load )- its a life cycle book
   // always called after the constructor when the book component is initialized
  ngOnInit() { 
    this.getBooks(); 
    console.log("inside ng on init");
  }

  //get list of available books
  getBooks(){
    this.isSaved = false;
    this.isUpdated = false;
    this.isDeleted = false;    
    this.bookService.getBooks()
    .subscribe((resp) => {
        console.log(resp);
        this.bookList = resp;                     
    });
  }
  //1. send request to service
  //2. get the response.
  addBook(formData: NgForm){
    this.bookService.addBook(formData.value)
                    .subscribe( ( resp ) => {
                      console.log(resp);
                      if(resp){
                        this.isSaved = true;
                      }
                      this.getBooks();
                    });
    console.log(formData)
  }

  addToDelete(book: BookComponent){
  //  if(this.isChecked == true){
      this.selectedBook = book;
  //  }
    
  }

  // delete book
  deleteBook(){    
    this.bookService.deleteBook(this.selectedBook)
                  .subscribe((resp) => {
                  console.log(resp);
                  if(resp){
                    this.isDeleted = true;
                  }
                  this.getBooks();
              })
    
  }

  updateBook(formData: NgForm){
    this.bookService.updateBook(formData.value)
                    .subscribe( ( resp ) => {
                      console.log(resp);
                      if(resp){
                        this.isUpdated = true;
                      }
                      this.getBooks();
                    });
    console.log(formData)
  }
}
