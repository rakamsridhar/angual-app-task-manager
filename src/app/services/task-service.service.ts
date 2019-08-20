import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs'
import { map } from 'rxjs/Operators'

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  constructor(private http: Http) { }

  //get list of tasks
  getTasks(){
    console.log("inside get tasks");
    return this.http.get("http://localhost:8086/taskmanager/all")
      .pipe(map (( resp ) =>{
        console.log(resp);
        return resp.json();
      }))
  }

  // Add task
  addTask(taskData){
    console.log(taskData);
    return this.http.post("http://localhost:8086/taskmanager/add",taskData)
                    .pipe(map((resp) => {
                      console.log(resp);
                      return resp.toString();
                    }))
  }

  //delete task
  deleteTask(task){
    console.log(task);
    return this.http.delete('http://localhost:8086/taskmanager/delete/' + task.task_id)
                    .pipe(map((resp) => {
                      console.log(resp);
                      return resp.toString();
                    }))
  }

  //update task
  updateTask(taskData){
    console.log(taskData);
    return this.http.put("http://localhost:8086/taskmanager/update",taskData)
                    .pipe(map((resp) => {
                      console.log(resp);
                      return resp.toString();
                    }))
  }

  endTask(task){
    console.log(task);
    task.status = 'COMPLETED';
    console.log(task);
    return this.http.put('http://localhost:8086/taskmanager/update/', task)
                    .pipe(map((resp) => {
                      console.log(resp);
                      return resp.toString();
                    }))
  }
}
