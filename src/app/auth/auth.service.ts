import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public token:any;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  private tokenTimer:any;
  private userId:any;
  constructor(private http:HttpClient,private router:Router) { }
  getToken(){
    return this.token;
  }
   createUser(authData:any){
    return this.http.post('http://localhost:3000/api/user/signup',authData);
  }

  loginUser(email:string,password:string){
    const authData:any = { email:email,password:password }
    this.http.post<{token:string,expiresIn:number,userId:string}>('http://localhost:3000/api/user/' + "login",authData).subscribe(response=>{
      const token = response.token;
      this.token = token;
      if(token){
        const expiresInDuration = response.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.isAuthenticated = true;
        this.userId = response.userId;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        this.saveAuthData(token,expirationDate,this.userId);
        this.router.navigate(['/'])
      }
    },error=>{
      this.authStatusListener.next(false);
    })
  }

  getAuthStatusListenr(){
    return this.authStatusListener.asObservable();
  }
  getIsAuth(){
    if(localStorage.getItem('token'))
    return true;
    else return false;
  }

  getUserId(){
    return this.userId;
  }

  logout(){
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.userId = null;
    this.router.navigate(['/auth/login']);
  }

  private setAuthTimer(duration:number){
    this.tokenTimer = setTimeout(()=>{
      this.logout()
    },60 * 1000);
  }

  private saveAuthData(token:string,expirationDate:Date,userId:string){
    localStorage.setItem('token',token);
    localStorage.setItem('expirationDate',expirationDate.toISOString());
    localStorage.setItem('userId',userId);
  }

  private clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
  }

  autoAuthUser(){
    const authInformation = this.getAuthData();
    if(!authInformation){
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if(expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  private getAuthData(){
    const token = localStorage.getItem('token');
    const expirationDate:any = localStorage.getItem('expirationDate');
    const userId = localStorage.getItem('userId')
    if(!token && !expirationDate) {
      return;
    }
    return {
      token : token,
      expirationDate:new Date(expirationDate),
      userId:userId
    }
  }
}
