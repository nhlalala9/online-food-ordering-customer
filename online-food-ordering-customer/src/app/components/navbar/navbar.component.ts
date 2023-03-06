import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public totalItem : number = 1;
  public searchTerm !: string;
  getCartDetails: any[] = [];
  total: number = 0;
  cartNumber: number = 0;
  
  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.loadCart();
  }
  loadCart(): void {
    const cartData = localStorage.getItem('localCart');
    console.log(cartData,"me");

    
    
    if (cartData) {
      this.getCartDetails = JSON.parse(cartData);
      console.log(this.getCartDetails,"why");
      this.total = this.getCartDetails.reduce((acc, val) => acc + (val.attributes?.price * val.attributes?.quantity), 0);
      console.log(this.total,"total")
      localStorage.setItem('total', JSON.stringify(this.total));
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
}
