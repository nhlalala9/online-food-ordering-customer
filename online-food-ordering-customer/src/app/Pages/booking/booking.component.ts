import { Component, OnInit } from '@angular/core';
import { BookingsService } from 'src/app/service/bookings.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  bookings: any;

  formData = {
    name: "",
    time: "",
    message: "",
    guests: "",
    phone: "",
    email:""
  };
  constructor(private bookingServices:BookingsService) { }

  ngOnInit(): void {
    this.bookingServices.getBookings(this.formData.name).subscribe((bookings: any) =>{
      this.bookings = bookings.data;
      console.log(bookings.data)
    })
  }


  
  onSubmit() {
    // Call Strapi service to post form data
console.log(this.formData)
    this.bookingServices.postFormData(this.formData).subscribe(response => {
      console.log(response);
    });
  }

}
