import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ToastComponent } from './components/toast/toast.component';
import { ReactiveFormsModule,Validators } from '@angular/forms';
import { LandingComponent } from './components/landing/landing.component';
import { HomeComponent } from './Pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BookingComponent } from './Pages/booking/booking.component';
import { ProductComponent } from './Pages/product/product.component';
import { FormsModule } from '@angular/forms';
import { BookingHistoryComponent } from './Pages/booking-history/booking-history.component';
import { CartComponent } from './Pages/cart/cart.component';
import { DatePipe } from '@angular/common';
import { CheckoutComponent } from './Pages/checkout/checkout.component';
import { OrderComponent } from './Pages/order/order.component';
import { NgxPaginationModule } from 'ngx-pagination';
// import { NgCircleProgressModule } from 'ng-circle-progress';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxUiLoaderModule } from "ngx-ui-loader";
// import { NgxSpinnerModule } from "ngx-spinner";




// import {MatToolbarModule} from '@angular/material/toolbar'




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ToastComponent,
    LandingComponent,
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    BookingComponent,
    ProductComponent,
    BookingHistoryComponent,
    CartComponent,
    CheckoutComponent,
    OrderComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    NgxUiLoaderModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
