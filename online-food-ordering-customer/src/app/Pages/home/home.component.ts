
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  router: any;
  products: any;

  constructor(private http:HttpClient, private ProductsService:ProductsService ) { }

  ngOnInit(): void {
    this.ProductsService.getProducts().subscribe((products: any) =>{
      this.products = products.data;
      console.log(products.data)
    })
    
  }

  deleteProducts(){
    if (confirm("Do you really want to delete this product")) {
      this.http
        .delete("http://localhost:1337api/products/")
        .subscribe((data) => {
          this.router.navigate(["/"]);
        });
    }
  }

  item(num: any){
   
    localStorage.setItem('id',this. products[num].id);
    this.router.navigate(['/contact/view'])
  }

}
function products(products: any) {
  throw new Error('Function not implemented.');
}