import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { BookingsService } from 'src/app/service/bookings.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public totalItem : number = 1;
  public searchTerm !: string;
  getCartDetails: any[] = [];
  total: number = 0;
  cartNumber: number = 0;
  bookings: any[] = [];
  orders: any[] = [];
  nothing: any[] = [];
  final: any[] = [];
  public username = localStorage.getItem('s_username');

  constructor(private auth: AuthenticationService,private router: Router,private cartService : CartService, private bookingServices: BookingsService) { }


  showNotificationModal: boolean = false;

  openNotificationModal() {
    this.showNotificationModal = true;
  }

  closeNotificationModal() {
    this.showNotificationModal = false;
  }


  ngOnInit(): void {

    this.bookingServices.getBooking().subscribe((booking: any) => {
      this.bookings = booking.data;
      this.nothing = booking.data.filter((order: any) => order.attributes.camel === null && order.attributes.name === this.username);
      this.orders = this.nothing;
      this.final = this.nothing;
      console.log(this.orders,"toka");
      console.log(this.final,"null");
    });


    this.loadCart();
  }



  approveItem(item: any) {
    const id = item.id;
    const camel = 'Approved';
    const index = this.bookings.findIndex((r: any) => r.id === item.id);
    console.log(index);

    this.bookingServices.updateItemStatus(id, camel).subscribe(
      (res) => {
        console.log(res, 'see console');
        window.location.reload();
      },
      (err) => {
        console.error(err);
      }
    );
  }

  loadCart(): void {
    const cartData = localStorage.getItem('localCart');
    console.log(cartData,"me");



    if (cartData) {
      this.getCartDetails = JSON.parse(cartData);
      console.log(this.getCartDetails,"why");
      this.total = this.getCartDetails.reduce((acc, val) => acc + (val.attributes?.price * val.attributes?.quantity), 0);
      console.log(this.total,"total")
      localStorage.setItem('total', JSON.stringify(this.total));
      console.log(this.total)
    } else {
      this.getCartDetails = [];
      this.total = 0;
    }
    this.cartNumberFunc();
  }

  cartNumberFunc(): void {
    const cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cartNumber = JSON.parse(cartData).length;
    } else {
      this.cartNumber = 0;
    }
    this.cartService.addtoCart(this.cartNumber);
  }
}
