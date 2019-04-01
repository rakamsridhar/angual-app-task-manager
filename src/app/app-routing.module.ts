import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubjectComponent } from './subject/subject.component'
import { BookComponent } from './book/book.component'

const routes: Routes = [
  {path : 'subject', component: SubjectComponent},
  {path : 'book', component: BookComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
