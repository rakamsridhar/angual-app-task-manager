import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { TaskServiceService } from 'src/app/services/task-service.service'

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddTaskComponent implements OnInit {

  taskSaved:boolean = false;
  constructor(private taskService:TaskServiceService) {
    console.log("inside Add Task constructor");
    this.taskSaved = false;
   }


  ngOnInit() {
    
  }

    //1. send request to service
  //2. get the response.
  addTask(formData: NgForm){
    this.taskService.addTask(formData.value)
                    .subscribe( ( resp ) => {
                      console.log(resp);
                      if(resp){
                        this.taskSaved = true;
                      }
                     // this.getTasks();
                    });
    console.log(formData)
  }

}
