import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public grandTotal: number = 0;

  constructor(
    private cartService: CartService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  public checkoutForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    address: ['', Validators.required],
  });

  public cartDetails!: any[];

  getCartDetails: any[] = [];
  total: number = 0;
  cartNumber: number = 0;

  ngOnInit(): void {
    this.loadCart();
    console.log(this.getCartDetails, 'show');
  }

  onSubmit(): void {
    localStorage.setItem('total', JSON.stringify(this.total));
    const order = {
      name: this.checkoutForm.value.name,
      phoneNumber: this.checkoutForm.value.phoneNumber,
      email: this.checkoutForm.value.email,
      address: this.checkoutForm.value.address,
      cartDetails: this.getCartDetails,
    };
    console.log(order, 'order');
    this.router.navigateByUrl('/customer/checkout');
  }

  loadCart(): void {
    const cartData = localStorage.getItem('localCart');
    console.log(cartData, 'me');

    if (cartData) {
      this.getCartDetails = JSON.parse(cartData);
      console.log(this.getCartDetails, 'why');
      this.total = this.getCartDetails.reduce(
        (acc, val) => acc + val.attributes?.price * val.attributes?.quantity,
        0
      );
      console.log(this.total, 'total');
      localStorage.setItem('total', JSON.stringify(this.total));
      console.log(this.total);
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

  incQnt(prodId: number, qnt: number): void {
    for (let i = 0; i < this.getCartDetails.length; i++) {
      if (this.getCartDetails[i].prodId === prodId) {
        if (qnt < 5) {
          this.getCartDetails[i].attributes.quantity = qnt + 1;
          localStorage.setItem(
            'localCart',
            JSON.stringify(this.getCartDetails)
          );
          this.loadCart();
        }
        break;
      }
    }
  }

  decQnt(prodId: number, qnt: number): void {
    for (let i = 0; i < this.getCartDetails.length; i++) {
      if (this.getCartDetails[i].prodId === prodId) {
        if (qnt > 1) {
          this.getCartDetails[i].attributes.quantity = qnt - 1;
          localStorage.setItem(
            'localCart',
            JSON.stringify(this.getCartDetails)
          );
          this.loadCart();
        }
        break;
      }
    }
  }

  removeall(): void {
    localStorage.removeItem('localCart');
    this.getCartDetails = [];
    this.total = 0;
    this.cartNumber = 0;
    this.cartService.addtoCart(this.cartNumber);
  }

  singleDelete(getCartDetail: number): void {
    if (localStorage.getItem('localCart')) {
      const localCart = localStorage.getItem('localCart');
      if (localCart !== null) {
        this.getCartDetails = JSON.parse(localCart);
        for (let i = 0; i < this.getCartDetails.length; i++) {
          if (this.getCartDetails[i].prodId === getCartDetail) {
            this.getCartDetails.splice(i, 1);
            localStorage.setItem(
              'localCart',
              JSON.stringify(this.getCartDetails)
            );
            this.loadCart();
            break;
          }
        }
      }
    }
  }
}
