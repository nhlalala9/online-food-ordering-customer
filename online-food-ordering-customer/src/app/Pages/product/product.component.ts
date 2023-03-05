import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/service/products.service';
import { RatingService } from 'src/app/service/rating.service';
import { CartService } from 'src/app/service/cart.service';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from 'src/app/service/authentication.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
public username = localStorage.getItem('s_username');
  product: any;
  why='';
  router: any;
  stars= [1, 2, 3, 4, 5];
  rating= 0;
 productList : any ;
  currentDate = new Date();
 formattedDate = this.datePipe.transform(this.currentDate, 'dd/MM/yyyy');
 rati: any[] = []
 

  constructor(private productsService: ProductsService, private ss: AuthenticationService, private route: ActivatedRoute, private ratings: RatingService,private datePipe: DatePipe,private cartService : CartService) { }




  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.productsService.getById(id).subscribe(product => {
        this.product = product.data;
        console.log(this.product.id,"hiiii")

      });
    });
    this.ratings.getRating().subscribe((products: any) =>{
      this.rati = products.data;
      console.log(this.rati,"rating")
    })
  }



onSubmit() {
  this.productsService.getById(this.product.id).subscribe(
    (one: any) => {
      console.log(this.product.id, "bbb");
      const ratingData = {
        name: this.formData.name,
        date: new Date(),
        comment: this.formData.comment,
        rate: this.formData.rate,
        product: this.product.id,
      };
      console.log(one.id, "lets seeee you bitch");

      this.ratings.createRating(ratingData).subscribe(
        (response: any) => {
          console.log(response);
          if (this.product.ratings && this.product.ratings.data) {
            this.product.ratings.data.push(response.data);
          } else {
            this.product.ratings = {
              data: [response.data],
            };
          }
        },
        (error: any) => {
          console.error(error);
        }
      );
    },
    (error: any) => {
      console.error(error);
    }
  );
}


  formData = {
    name: this.username,
    date: " ",
    comment: "",
    rate: 0
 
  }
  updateRating(r:any){
    this.rating=r;
    this.why = r
    console.log(this.why,"rating")
    this.currentDate = new Date();
    this.formattedDate = this.datePipe.transform(this.currentDate, 'dd/MM/yyyy');
    this.formData.date = this.formattedDate ?? ''
    this.formData.rate = this.rating;
    this.formData.name = this.username
    console.log(this.username,"user")
    return this.rating
  }
;
 

  item(num: any){
   
    localStorage.setItem('id',this.product[num].id);
    this.router.navigate(['/customer/food'])
  }


  addtocart(product: any){
    this.cartService.addtoCart(product);
    console.log(this.product,"cart addded")
  }
}
