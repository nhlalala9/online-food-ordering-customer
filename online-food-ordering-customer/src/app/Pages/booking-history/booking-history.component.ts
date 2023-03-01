import { Component, OnInit } from '@angular/core';
import { BookingsService } from 'src/app/service/bookings.service';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})
export class BookingHistoryComponent implements OnInit {
  bookings: any;
  username:any;

  constructor(private bookingServices:BookingsService) { }

  ngOnInit(): void {
    this.bookingServices.getBookings(this.username).subscribe((bookings: any) =>{
      this.bookings = bookings.data;
      console.log(bookings.data)
    })
  }

}
