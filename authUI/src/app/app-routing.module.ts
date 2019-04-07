import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: 'register', pathMatch: 'full'
  }, {
    path: 'register', loadChildren: './register/register.module#RegisterModule'
  }, {
    path: 'login', loadChildren: './login/login.module#LoginModule'
  }, {
    path: 'Dashboard', loadChildren: './dashboard/dasboard.module#DashboardModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
