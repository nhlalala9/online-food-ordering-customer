import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/service/products.service';
import { RatingService } from 'src/app/service/rating.service';
import { CartService } from 'src/app/service/cart.service';
import { DatePipe } from '@angular/common';


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
 productList : any ;
  // Date = new Date();
  currentDate = new Date();
 formattedDate = this.datePipe.transform(this.currentDate, 'dd/MM/yyyy');
 rati: any[] = []
  // Date = new Date();

  constructor(private productsService: ProductsService, private route: ActivatedRoute, private ratings: RatingService,private datePipe: DatePipe,private cartService : CartService) { }
  

  // ngOnInit() {
  //   const id = this.route.snapshot.paramMap.get('id');
  //   this.productsService.getById(id).subscribe(
  //     response => {
  //       this.product = response.data;
 
  //       console.log(this.product,"ora see")
    
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );

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


//   onSubmit() {
// console.log(this.formData)
// const ratingData = {
//   name: this.formData.name,
//   date: this.formData.date,
//   comment: this.formData.comment,
//   rate: this.formData.rate,
//   product: this.product.id
  
// };
// console.log(this.product.id,"id")
//     this.ratings.createRating(ratingData).subscribe(response => {
//       console.log(response);
//     });
//   }
onSubmit() {
  this.productsService.getById(this.product.id).subscribe(product => {
    console.log(this.product.id,"bbb")
    const ratingData = {
      name: this.formData.name,
      date: this.formData.date,
      comment: this.formData.comment,
      rate: this.formData.rate,
      product: product
    };
console.log(this.product,"lets seeee you bitch")
    this.ratings.createRating(ratingData).subscribe(response => {
      console.log(response);
    });
  });
}

  formData = {
    name: "Oratile",
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
