import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product: any;
  router: any;

  constructor(private productsService: ProductsService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.productsService.getById(id).subscribe(
      response => {
        this.product = response;
        console.log(this.product)
      },
      error => {
        console.log(error);
      }
    );
  }


  item(num: any){
   
    localStorage.setItem('id',this.product[num].id);
    this.router.navigate(['/customer/food'])
  }

}