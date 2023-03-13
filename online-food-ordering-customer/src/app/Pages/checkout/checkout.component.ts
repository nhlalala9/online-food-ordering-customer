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
  paymentHandler: any = null;
  checkout: any;

  constructor(private datePipe: DatePipe,private cartService : CartService,private fb: FormBuilder,private checkoutService : CheckoutService) { }
  public checkoutForm: FormGroup = this.fb.group({
    name: " ",
    phoneNumber:"",
    email:"",
    address: " ",
    date: "",
    total: 0
  });
  getCartDetails: any[] = [];
  total: number = 0;
  cartNumber: number = 0;
  currentDate = new Date();
  formattedDate = this.datePipe.transform(this.currentDate, 'dd/MM/yyyy');
 
  public username = localStorage.getItem('s_username');
  public email = localStorage.getItem('s_userEmail');
  public grandtotal = localStorage.getItem('total');
  ngOnInit(): void {
    this.loadCart();
    console.log(this.getCartDetails,"show")

    this.invokeStripe();
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
    this.currentDate= new Date();
    this.formattedDate = this.datePipe.transform(this.currentDate, 'dd/MM/yyyy');
    this.checkoutForm.patchValue({
      date: this.formattedDate ?? ''
    });
    const order = {
      name: this.username,
      date: new Date(),
      phoneNumber: this.checkoutForm.value.phoneNumber,
      email: this.email,
      address: this.checkoutForm.value.address,
      cartDetails: this.getCartDetails,
      total:this.grandtotal
    };
    console.log(order,"order")
    console.log(order.date, "check date")

    this.checkoutService.checkout(order).subscribe(response => {
  
      console.log(response,"works");
      alert("Succesfull placed your order");
    });

    // Clear the form and cart after submission
    this.checkoutForm.reset();
    localStorage.removeItem('localCart');
    this.cartService.addtoCart(0);
  }


  // for payment
  makePayment(amount: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51MTmVOJ4KXUZIvUmY1DwumWudhZOFtjF0zCvZEXpudqsTy2jRYKP1s1GxpoMYAvuCteOEV1spFn65ak11Gyv4nPj00dfOLKEAI',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        alert('Stripe token generated!');

        paymentStripe(stripeToken)
      },
    });
     
    const paymentStripe = (stripeToken:any) =>{
      this.checkout.makePayment(stripeToken).subscribe((data:any) =>{
        console.log(data)
      })
    }

    paymentHandler.open({
      name: 'Positronx',
      description: '3 widgets',
      amount: amount * 100,
    });
  }
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/typescript';
      script.src = 'https://checkout.stripe.com/checkout.component.html';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51MTmVOJ4KXUZIvUmY1DwumWudhZOFtjF0zCvZEXpudqsTy2jRYKP1s1GxpoMYAvuCteOEV1spFn65ak11Gyv4nPj00dfOLKEAI',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
            alert('Payment has been successfull!');
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }

}
