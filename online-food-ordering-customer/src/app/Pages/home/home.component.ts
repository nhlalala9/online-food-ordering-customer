import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/service/products.service';
import { CartService } from 'src/app/service/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  product: any;
  me: any;
  public productList: any;
  public cart: any = [];
  public grandTotal!: number;
  public products: any = [];
  cartData: any[] = [];
  getCartDetails: any[] = [];
  total: number = 0;
  cartNumber: number = 0;
  

  constructor(
    private http: HttpClient,
    private ProductsService: ProductsService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ProductsService.getProducts().subscribe((product: any) => {
      this.product = product.data;
      console.log(product.data, "all products");
    });
    this.loadCart();
  }

  deleteProducts() {
    if (confirm('Do you really want to delete this product')) {
      this.http
        .delete('http://localhost:1337api/products/')
        .subscribe((data) => {
          this.router.navigate(['/']);
        });
    }
  }

  itemsCart: any= [];
  addtocart(category: any) {
    console.log(category); // log the category object
    console.log(category.id); // log the prodId property of category
    console.log(category.attributes.quantity);
    let cartDataNull = localStorage.getItem('localCart');
    if (cartDataNull == null) {

      let storeDataGet: any = [];
      storeDataGet.push(category);
      localStorage.setItem('localCart', JSON.stringify(storeDataGet));
    } else {
      var id = category.prodId;
      let index: number = -1;
      this.itemsCart = [];
      const cartData = localStorage.getItem('localCart');
      if (cartData !== null) {
        this.itemsCart = JSON.parse(cartData);
        console.log(cartData,"data")
      }
      for (let i = 0; i < this.itemsCart.length; i++) {
        console.log(category.id, "id 1");
        console.log(this.itemsCart[i].id, "id 3")
        if (parseInt(category.id) === parseInt(this.itemsCart[i].id)) {
          this.itemsCart[i].attributes.quantity += category.attributes.quantity;
          index = i;
          
          break;
        }
      }
      if (index == -1) {
       this.cartData.push(category);
        localStorage.setItem('localCart', JSON.stringify([...this.itemsCart, category]));
      } else {
        localStorage.setItem('localCart', JSON.stringify(this.itemsCart));
      }
    }
    this.cartNumberFunc();
  }
  
  cartNumber1: number = 0;
  cartNumberFunc() {
    const cartData = localStorage.getItem('localCart');
    this.cartNumber1 = cartData ? JSON.parse(cartData).reduce((total: any, item: any) => total + item.quantity, 0) : 0;
    this.cartService.addtoCart(this.product);
  }

  item(num: any) {
    localStorage.setItem('id', this.product[num].id);
    this.router.navigate(['/contact/view']);
  }



checkout(){
  this.router.navigateByUrl('/customer/checkout')
}
///cart here 

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
this.cartNumberFunc1();
}

cartNumberFunc1(): void {
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
    if (qnt > 1) {
      this.getCartDetails[i].attributes.quantity = qnt - 1;
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




























}
function products(products: any) {
  throw new Error('Function not implemented.');
}
