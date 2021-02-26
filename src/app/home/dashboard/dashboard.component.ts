import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  isCollapsed = false;

  constructor(private authSrv:AuthService) { }

  ngOnInit(): void {
  }
  onLogout(){
    this.authSrv.logout();
  }
}
