import { Component, OnInit } from '@angular/core';
// import { Console } from 'console';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
qty:number=1;
  public products : any = [];
  public grandTotal !: number;
  constructor(private cartService : CartService) { }
  getCartDetails: any[] = [];
  total: number = 0;
  cartNumber: number = 0;
  
  ngOnInit(): void {
    this.loadCart();
  }
  
  loadCart(): void {
    const cartData = localStorage.getItem('localCart');
    console.table(cartData);
    
    if (cartData) {
      this.getCartDetails = JSON.parse(cartData);
      this.total = this.getCartDetails.reduce((acc, val) => acc + (val.amt * val.qnt), 0);
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
        if (this.qty < 5) {
          this.getCartDetails[i].qty = this.qty + 1;
          localStorage.setItem('localCart', JSON.stringify(this.getCartDetails));
          this.loadCart();
        }
        break;
      }
    }
  }
  
  decQnt(prodId: number, qnt: number): void {
    for (let i = 0; i < this.getCartDetails.length; i++) {
      if (this.getCartDetails[i].prodId === prodId) {
        if (this.qty > 1) {
          this.getCartDetails[i].qty = this.qty - 1;
          localStorage.setItem('localCart', JSON.stringify(this.getCartDetails));
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
      if(localCart !== null) {
        this.getCartDetails = JSON.parse(localCart);
        for (let i = 0; i < this.getCartDetails.length; i++) {
          if (this.getCartDetails[i].prodId === getCartDetail) {
            this.getCartDetails.splice(i, 1);
            localStorage.setItem('localCart', JSON.stringify(this.getCartDetails));
            this.loadCart();
            break;
          }
        }
      }
    }
  }

  
  // ngOnInit(): void {
  //   this.cartService.productList.subscribe((products) => {
  //     this.products = products;
  //     console.log(this.products,"why now");
  //     this.grandTotal = this.cartService.getTotalPrice();
  //   })
  // }

//   getCartDetails:any=[];
//   CartDetails(){
// if(localStorage.getItem('localCart')){
// this.getCartDetails = JSON.parse(localStorage.getItem('localCart'));
//   }
// }

//   removeItem(item: any){
//     this.cartService.removeCartItem(item);
//   }
//   emptycart(){
//     this.cartService.removeAllCart();
//   }

}