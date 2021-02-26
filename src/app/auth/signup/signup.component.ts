import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {
  signUpForm:any;
  constructor(private fb:FormBuilder,private authSrv:AuthService,private router:Router,private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      firstName:new FormControl(''),
      lastName:new FormControl(''),
      email:new FormControl(''),
      password:new FormControl('')
    })
  }

  createUser(template:any){
    this.authSrv.createUser(this.signUpForm.value).subscribe(res=>{
      this.createBasicNotification(template);
      this.router.navigate(['/auth/login']);
    })
  }
  createBasicNotification(template: TemplateRef<{}>): void {
    this.notification.template(template);
  }
}
