import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { UserDetailComponent } from './home/user-detail/user-detail.component';

const routes: Routes = [
  {
    path: '',
    component:DashboardComponent ,
    children:[
      {
        path:'',component:UserDetailComponent,canActivate:[AuthGuard]
      }
    ]
  },
  { path: 'auth',loadChildren:()=> import('./auth/auth.module').then(m => m.AuthModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
