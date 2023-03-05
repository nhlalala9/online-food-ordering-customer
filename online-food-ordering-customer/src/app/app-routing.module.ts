import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupGuard } from './guards/signup.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LandingComponent } from './components/landing/landing.component';
import { HomeComponent } from './Pages/home/home.component';
import { BookingComponent } from './Pages/booking/booking.component';
import { BookingHistoryComponent } from './Pages/booking-history/booking-history.component';
import { ProductComponent } from './Pages/product/product.component';
import { CartComponent } from './Pages/cart/cart.component';
import { CheckoutComponent } from './Pages/checkout/checkout.component';


const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'customer/home', component: HomeComponent },
  { path: 'customer/booking', component: BookingComponent },
  { path: 'customer/booking/history', component: BookingHistoryComponent },
  { path: 'customer/login', component: LoginComponent },
  { path: 'customer/cart', component: CartComponent },
  { path: 'customer/checkout', component: CheckoutComponent },
  {
    path: 'customer/register',
    component: RegisterComponent,
  },


  {path: 'customer/food/:id',component: ProductComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
