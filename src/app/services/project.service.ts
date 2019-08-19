import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs'
import { map } from 'rxjs/Operators'

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: Http) { }
  
     //get list of Projects
     getProjects(){
      console.log("inside get projects");
      return this.http.get("http://localhost:8086/projects/all")
        .pipe(map (( resp ) =>{
          console.log(resp);
          return resp.json();
        }))
    }
  
    // Add project
    addProject(projectData){
      console.log("project data " + projectData);
      return this.http.post("http://localhost:8086/projects/add",projectData)
                      .pipe(map((resp) => {
                        console.log(resp);
                        return resp.toString();
                      }))
    }
  
    //delete project
    deleteProject(project){
      console.log(project);
      return this.http.delete('http://localhost:8086/projects/delete/' + project.project_id)
                      .pipe(map((resp) => {
                        console.log(resp);
                        return resp.toString();
                      }))
    }
  
    //update project
    updateProject(projectData){
      console.log(projectData);
      return this.http.put("http://localhost:8086/projects/update",projectData)
                      .pipe(map((resp) => {
                        console.log(resp);
                        return resp.toString();
                      }))
    }
}
