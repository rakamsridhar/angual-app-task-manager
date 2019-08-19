import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service'
import { NgForm } from '@angular/forms'
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  projectList:[1000];
  isSaved:boolean = false;
  isDeleted:boolean = false;
  toggleEdit:boolean = false;

   constructor(private projectService:ProjectService) {    
    console.log("inside constructor");
   }
  ngOnInit() {
    this.getProjects(); 
    console.log("inside ng on init");
  }

  //get list of available projects
  getProjects(){
    this.isSaved = false;
    this.toggleEdit = false;    
    this.projectService.getProjects()
    .subscribe((resp) => {
        console.log(resp);
        this.projectList = resp;                     
    });
  }

    //1. send request to service
  //2. get the response.
  addProject(projectForm: NgForm){
    console.log("inside add project function " + projectForm.value);
    this.projectService.addProject(projectForm.value)
                    .subscribe( ( resp ) => {
                      console.log(resp);
                      if(resp){
                        this.isSaved = true;
                      }
                      this.getProjects();
                    });
    //console.log(this.projectForm)
  }

  // delete project
  deleteProject(project: AddProjectComponent){    
    this.projectService.deleteProject(project)
                  .subscribe((resp) => {
                  console.log(resp);
                  if(resp){
                    this.isDeleted = true;
                  }
                  this.getProjects();
              })
    
  }

}
