import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupGuard } from './guards/signup.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LandingComponent } from './components/landing/landing.component';
const routes: Routes = [
  { path: '', component: LandingComponent },
  
  { path: 'customer/login', component: LoginComponent },
  {
    path: 'customer/register',
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
