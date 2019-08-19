import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTaskComponent } from './addtask/addtask.component'
import { AddUserComponent } from './add-user/add-user.component'
import { AddProjectComponent } from './add-project/add-project.component'
import { TaskComponent } from './task/task.component'

const routes: Routes = [
  {path : 'addtask', component: AddTaskComponent},
  {path : 'adduser', component: AddUserComponent},
  {path : 'addproject', component: AddProjectComponent},
  {path : 'task', component: TaskComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
