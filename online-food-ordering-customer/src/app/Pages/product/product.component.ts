import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/service/products.service';
import { RatingService } from 'src/app/service/rating.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product: any;
  
  why='';
  router: any;

  stars= [1, 2, 3, 4, 5];
  rating= 0;
  // Date = new Date();
  constructor(private productsService: ProductsService, private route: ActivatedRoute, private ratings: RatingService) { }

  ngOnInit() {
    // console.log(this.formData.date,"date")
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




  onSubmit() {
    // Call Strapi service to post form data
console.log(this.formData)
    // this.ratings.createRating(this.formData).subscribe(response => {
    //   console.log(response);
    // });
  }


  formData = {
    name: "Toka",
    date: new Date(),
    comment: "",
    rate: 0
 
  }
  updateRating(r:any){
    this.rating=r;
    this.why = r
    console.log(this.why,"rating")
    this.formData.rate = this.rating;
    return this.rating
  }
;
 

  item(num: any){
   
    localStorage.setItem('id',this.product[num].id);
    this.router.navigate(['/customer/food'])
  }



}
