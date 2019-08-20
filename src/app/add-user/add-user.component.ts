import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service'
import { NgForm } from '@angular/forms'
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})


export class AddUserComponent implements OnInit {
  userForm: FormGroup;


  userList:[1000];
  isSaved:boolean = false;
  isDeleted:boolean = false;
  toggleEdit:boolean = false;
  buttonText:String = 'Add';
  private formBuilder:FormBuilder

  constructor(private userService:UserService, private fb: FormBuilder) {    
    console.log("inside constructor");
    this.formBuilder = fb;
    this.userForm = this.createUserFormGroup();    
   }


  ngOnInit() {
    this.getUsers(); 
    console.log("inside ng on init");
  }

  createUserFormGroup(){
    return this.formBuilder.group({
        first_name: 'sridhar First',
        last_name: 'Sridhar Last',
        employee_id:'123',
        user_id:''
    })
  }


   //get list of available users
   getUsers(){
    this.isSaved = false;
    this.toggleEdit = false;    
    this.userService.getUsers()
    .subscribe((resp) => {
        console.log(resp);
        this.userList = resp;                     
    });
  }

  onSubmit(){
    console.log(" inside sumit function:")
    if(this.toggleEdit){
      this.updateUser();
    }
    else{
      this.addUser();
    }
  }

    //1. send request to service
  //2. get the response.
  addUser(){
    console.log("inside add user function " + this.userForm.value);
    
    this.userService.addUser(this.userForm.value)
                    .subscribe( ( resp ) => {
                      console.log(resp);
                      if(resp){
                        this.isSaved = true;
                      }
                      this.getUsers();
                    });
    console.log(this.userForm)
  }

  // delete user
  deleteUser(user: AddUserComponent){    
    this.userService.deleteUser(user)
                  .subscribe((resp) => {
                  console.log(resp);
                  if(resp){
                    this.isDeleted = true;
                  }
                  this.getUsers();
              })
    
  }

  editUser(user){
    console.log("inside edit values");
    this.toggleEdit = true;
    this.buttonText = 'Edit';
    this.userForm.patchValue({
      first_name: user.first_name,
      last_name: user.last_name,
      employee_id: user.employee_id,
      user_id: user.user_id
     }) 
  }

  updateUser(){
    this.userService.updateUser(this.userForm.value)
    .subscribe( ( resp ) => {
      console.log(resp);
      if(resp){
        this.isSaved = true;
      }
      this.getUsers();
    });
  }

  resetForm(){
    this.userForm.reset();
    this.buttonText = 'Add';
  }



}
