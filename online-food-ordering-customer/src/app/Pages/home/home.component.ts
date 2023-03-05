import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/service/products.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  router: any;
  product: any;
  me: any;
  public productList: any;
  public cart: any = [];
  public grandTotal!: number;
  public products: any = [];

  constructor(
    private http: HttpClient,
    private ProductsService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.ProductsService.getProducts().subscribe((product: any) => {
      this.product = product.data;
      // this.productList.forEach((a: any) => {
      //   Object.assign(a, { quantity: 1, total: a.price });
      // });
      console.log(product.data);
    });
    this.cartService.productList.subscribe((products) => {
      this.products = products;
      console.log(this.products, 'why now');
      this.grandTotal = this.cartService.getTotalPrice();
    });
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
  addtocart(product: any){
    this.cartService.addtoCart(product);
    console.table(this.product)
  }
  // itemsCart: any= [];
  // addtocart(category: any) {
  //   let cartDataNull = localStorage.getItem('localCart');
  //   if (cartDataNull == null) {

  //     let storeDataGet: any = [];
  //     storeDataGet.push(category);
  //     localStorage.setItem('localCart', JSON.stringify(storeDataGet));
  //   } else {
  //     var id = category.prodId;
  //     let index: number = -1;
  //     this.itemsCart = [];
  //     const cartData = localStorage.getItem('localCart');
  //     if (cartData !== null) {
  //       this.itemsCart = JSON.parse(cartData);
  //     }
  //     for (let i = 0; i < this.itemsCart.length; i++) {
  //       if (parseInt(id) === parseInt(this.itemsCart[i].prodId)) {
  //         this.itemsCart[i].qnt = category.qnt;
  //         index = i;
  //         break;
  //       }
  //     }
  //     if (index == -1) {
  //       this.itemsCart.push(category);
  //       localStorage.setItem('localCart', JSON.stringify(this.itemsCart));
  //     } else {
  //       localStorage.setItem('localCart', JSON.stringify(this.itemsCart));
  //     }
  //   }
  //   this.cartNumberFunc();
  // }
  
  // cartNumber:number = 0;
  // cartNumberFunc(){
  //   const cartData = localStorage.getItem('localCart');
  //   this.cartNumber = cartData ? JSON.parse(cartData).length : 0;
  //   this.cartService.addtoCart(this.product);
  // }
  

  item(num: any) {
    localStorage.setItem('id', this.product[num].id);
    this.router.navigate(['/contact/view']);
  }
}
function products(products: any) {
  throw new Error('Function not implemented.');
}
