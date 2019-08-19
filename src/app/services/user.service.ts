import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs'
import { map } from 'rxjs/Operators'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: Http) { }

   //get list of Users
   getUsers(){
    console.log("inside get users");
    return this.http.get("http://localhost:8086/users/all")
      .pipe(map (( resp ) =>{
        console.log(resp);
        return resp.json();
      }))
  }

  // Add user
  addUser(userData){
    console.log("user data " + userData);
    return this.http.post("http://localhost:8086/users/add",userData)
                    .pipe(map((resp) => {
                      console.log(resp);
                      return resp.toString();
                    }))
  }

  //delete user
  deleteUser(user){
    console.log(user);
    return this.http.delete('http://localhost:8086/users/delete/' + user.user_id)
                    .pipe(map((resp) => {
                      console.log(resp);
                      return resp.toString();
                    }))
  }

  //update user
  updateUser(userData){
    console.log(userData);
    return this.http.put("http://localhost:8086/users/update",userData)
                    .pipe(map((resp) => {
                      console.log(resp);
                      return resp.toString();
                    }))
  }
}
