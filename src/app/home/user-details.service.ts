import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  constructor(private http:HttpClient) { }

  getAllUsers(){
    return this.http.get<any>('http://localhost:3000/api/user');
  }

  deleteUser(id:any){
    return this.http.delete<any>('http://localhost:3000/api/user/'+id);
  }

  updateUser(id:any,user:any){
    return this.http.put<any>('http://localhost:3000/api/user/'+id,user);
  }
}
