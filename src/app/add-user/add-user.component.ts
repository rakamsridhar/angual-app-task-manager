import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service'
import { NgForm } from '@angular/forms'
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    employeeID: new FormControl(''),
  });

  userList:[1000];
  isSaved:boolean = false;
  isDeleted:boolean = false;
  toggleEdit:boolean = false;

  constructor(private userService:UserService) {    
    console.log("inside constructor");
   }

  ngOnInit() {
    this.getUsers(); 
    console.log("inside ng on init");
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

    //1. send request to service
  //2. get the response.
  addUser(userForm: NgForm){
    console.log("inside add user function " + userForm.value);
    this.userService.addUser(userForm.value)
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
    this.userForm.patchValue({
      firstName: user.first_name,
      lastName: user.last_name,
      employeeID: user.employee_id
    }); 
    this.toggleEdit = true;
  }


}
