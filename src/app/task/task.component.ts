import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { TaskServiceService } from 'src/app/services/task-service.service'

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  task_id:string;
  parent_id:string;
  task:string;
  start_date:any;
  end_date: any;
  priority: string;
  
  
  isChecked:boolean = false;
  isSaved:boolean = false;
  isUpdated:boolean = false;
  isDeleted:boolean = false;

  taskList:[1000];
  
 selectedTask: TaskComponent;

  constructor(private taskService:TaskServiceService) {    
    console.log("inside constructor");
   }

   // automatically called by Angular ( On Load )- its a life cycle task
   // always called after the constructor when the task component is initialized
  ngOnInit() { 
    this.getTasks(); 
    console.log("inside ng on init");
  }

  //get list of available tasks
  getTasks(){
    this.isSaved = false;
    this.isUpdated = false;
    this.isDeleted = false;    
    this.taskService.getTasks()
    .subscribe((resp) => {
        console.log(resp);
        this.taskList = resp;                     
    });
  }
  //1. send request to service
  //2. get the response.
  addTask(formData: NgForm){
    this.taskService.addTask(formData.value)
                    .subscribe( ( resp ) => {
                      console.log(resp);
                      if(resp){
                        this.isSaved = true;
                      }
                      this.getTasks();
                    });
    console.log(formData)
  }

  addToDelete(task: TaskComponent){
  //  if(this.isChecked == true){
      this.selectedTask = task;
  //  }
    
  }

  // delete task
  deleteTask(){    
    this.taskService.deleteTask(this.selectedTask)
                  .subscribe((resp) => {
                  console.log(resp);
                  if(resp){
                    this.isDeleted = true;
                  }
                  this.getTasks();
              })
    
  }

  updateTask(formData: NgForm){
    this.taskService.updateTask(formData.value)
                    .subscribe( ( resp ) => {
                      console.log(resp);
                      if(resp){
                        this.isUpdated = true;
                      }
                      this.getTasks();
                    });
    console.log(formData)
  }
}
