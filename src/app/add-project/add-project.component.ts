import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service'
import { NgForm } from '@angular/forms'
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  projectForm: FormGroup;

  projectList:[1000];
  isSaved:boolean = false;
  isDeleted:boolean = false;
  toggleEdit:boolean = false;
  buttonText:String = 'Add';
  private formBuilder:FormBuilder

   constructor(private projectService:ProjectService, private fb: FormBuilder) {    
    console.log("inside constructor");
    this.formBuilder = fb;
    this.projectForm = this.createProjectFormGroup();  
   }
  ngOnInit() {
    this.toggleEdit = false;
    this.getProjects(); 
    console.log("inside ng on init");
  }

  createProjectFormGroup(){
    return this.formBuilder.group({
        project: '',
        start_date: '',
        end_date:'',
        priority:'',
        project_id:''
    })
  }

  onSubmit(){
    console.log(" inside sumit function:")
    if(this.toggleEdit){
      this.updateProject();
    }
    else{
      this.addProject();
    }
  }

  //get list of available projects
  getProjects(){
    this.isSaved = false;
    //this.toggleEdit = false;    
    this.projectService.getProjects()
    .subscribe((resp) => {
        console.log(resp);
        this.projectList = resp;                     
    });
  }

    //1. send request to service
  //2. get the response.
  addProject(){
    console.log("inside add project function " + this.projectForm.value);
    this.projectService.addProject(this.projectForm.value)
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

  editProject(project){
    console.log("inside edit values");
    this.toggleEdit = true;
    this.buttonText = 'Edit';
    this.projectForm.patchValue({
      project: project.project,
      start_date: project.start_date,
      end_date: project.end_date,
      priority: project.priority,
      project_id: project.project_id
     }) 
  }

  updateProject(){
    this.projectService.updateProject(this.projectForm.value)
    .subscribe( ( resp ) => {
      console.log(resp);
      if(resp){
        this.isSaved = true;
      }
      this.getProjects();
    });
  }

  resetForm(){
    this.projectForm.reset();
    this.buttonText = 'Add';
    this.toggleEdit = false;
  }

}
