import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  isLoading:boolean = false;
  authStatusSub:any;
  loginForm:any;
  constructor(private authSrv:AuthService,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:[''],
      password:['']
    })
    this.authStatusSub = this.authSrv.getAuthStatusListenr().subscribe(
      authStatus =>{
        this.isLoading = false;
      }
    );
  }
  onLogin(){
    if(this.loginForm.invalid){
      return;
    }
    this.isLoading = true;
    this.authSrv.loginUser(this.loginForm.value.email,this.loginForm.value.password);
  }

  ngOnDestroy(){
    this.authStatusSub.unsubscribe();
  }
}
