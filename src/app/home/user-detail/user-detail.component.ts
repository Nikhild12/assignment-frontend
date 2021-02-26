import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from '../user-details.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.less']
})
export class UserDetailComponent implements OnInit {
  userDetails:any[]=[];
  visible:boolean = false;
  isVisible = false;
  selectedUser:any;
  userForm:any;

  constructor(private userSrv:UserDetailsService,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.getAllUser();
    this.userForm = this.fb.group({
      _id:[''],
      firstName:[''],
      lastName:[''],
      email:['']
    })
  }

  getAllUser(){
    this.userSrv.getAllUsers().subscribe(data =>{
      this.userDetails = data.users;
    })
  }

  showModal(user:any): void {
    this.isVisible = true;
    this.selectedUser = user;
    this.userForm.patchValue(this.selectedUser);
  }
  handleCancel(): void {
    this.isVisible = false;
  }

  deleteUser(){
    const index = this.userDetails.findIndex(ele => ele._id == this.selectedUser._id);
    this.userSrv.deleteUser(this.selectedUser._id).subscribe(res=>{
      this.userDetails.splice(index, 1);
    })
    this.handleCancel();
  }

  updateUser(){
    const index = this.userDetails.findIndex(ele => ele._id == this.selectedUser._id);
    this.userSrv.updateUser(this.selectedUser._id,this.userForm.value).subscribe(res=>{
      this.getAllUser();
      this.close();
    })
  }
  open(): void {
    this.visible = true;
    this.handleCancel();
  }

  close() {
    this.visible = false;
  }
}
