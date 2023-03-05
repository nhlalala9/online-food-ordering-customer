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
  cartData: any[] = [];

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
      console.log(product.data, "all products");
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
  // addtocart(product: any){
  //   this.cartService.addtoCart(product);
  //   console.table(this.product)
  //   console.log(product.id)
  // }
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
        // this.itemsCart.push(category);
       this.cartData.push(category);
        // this.itemsCart.push({...category, quantity:  category.attributes.quantity});
        localStorage.setItem('localCart', JSON.stringify([...this.itemsCart, category]));
      } else {
        localStorage.setItem('localCart', JSON.stringify(this.itemsCart));
      }
    }
    this.cartNumberFunc();
  }
  
  cartNumber:number = 0;
  // cartNumberFunc(){
  //   const cartData = localStorage.getItem('localCart');
  //   this.cartNumber = cartData ? JSON.parse(cartData).length : 0;
  //   this.cartService.addtoCart(this.product);
  // }
  
  cartNumberFunc() {
    const cartData = localStorage.getItem('localCart');
    this.cartNumber = cartData ? JSON.parse(cartData).reduce((total: any, item: any) => total + item.quantity, 0) : 0;
    this.cartService.addtoCart(this.product);
  }

  item(num: any) {
    localStorage.setItem('id', this.product[num].id);
    this.router.navigate(['/contact/view']);
  }
}
function products(products: any) {
  throw new Error('Function not implemented.');
}
