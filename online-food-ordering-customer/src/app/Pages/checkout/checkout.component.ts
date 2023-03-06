import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/service/cart.service';
import { CheckoutService } from 'src/app/service/checkout.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private datePipe: DatePipe,private cartService : CartService,private fb: FormBuilder,private checkoutService : CheckoutService) { }
  public checkoutForm: FormGroup = this.fb.group({
    name: " ",
    phoneNumber:"",
    email:"",
    address: " ",
    date: ""
  });
  getCartDetails: any[] = [];
  total: number = 0;
  cartNumber: number = 0;
  currentDate = new Date();
  formattedDate = this.datePipe.transform(this.currentDate, 'dd/MM/yyyy');
 
  public username = localStorage.getItem('s_username');
  public email = localStorage.getItem('s_userEmail');
  ngOnInit(): void {
    this.loadCart();
    console.log(this.getCartDetails,"show")
  }

  loadCart(): void {
    const cartData = localStorage.getItem('localCart');
    console.log(cartData,"me");

    
    
    if (cartData) {
      this.getCartDetails = JSON.parse(cartData);
      console.log(this.getCartDetails,"why");
      this.total = this.getCartDetails.reduce((acc, val) => acc + (val.attributes?.price * val.attributes?.quantity), 0);
      console.log(this.total)
    } else {
      this.getCartDetails = [];
      this.total = 0;
    }
    this.cartNumberFunc();
  }
  
  cartNumberFunc(): void {
    const cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cartNumber = JSON.parse(cartData).length;
    } else {
      this.cartNumber = 0;
    }
    this.cartService.addtoCart(this.cartNumber);
  }

  onSubmit(): void {
    this.formattedDate = this.datePipe.transform(this.currentDate, 'dd/MM/yyyy');
    this.checkoutForm.patchValue({
      date: this.formattedDate ?? ''
    });
    const order = {
      name: this.username,
      // date: this.formattedDate,
      phoneNumber: this.checkoutForm.value.phoneNumber,
      email: this.email,
      address: this.checkoutForm.value.address,
      cartDetails: this.getCartDetails
    };
    console.log(order,"order")

    this.checkoutService.checkout(order).subscribe(response => {
      // Do something with the response if needed
      console.log(response,"works");
    });

    // Clear the form and cart after submission
    // this.checkoutForm.reset();
    // localStorage.removeItem('localCart');
    // this.cartService.addtoCart(0);
  }

}
