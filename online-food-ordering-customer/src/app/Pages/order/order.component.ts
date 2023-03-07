import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/service/orders.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  orders: any[] = [];
  now: any[] = [];
  order: any;
  cartDetails: any;
  bookings: any;
  public username = localStorage.getItem('s_username');

  constructor(private orderService: OrdersService) {}

  public selector(id: any) {
    this.orderService.getOrderByName(id).subscribe((booking: any) => {
      this.order = booking.data;
      this.cartDetails = this.order.attributes.cartDetails;
      console.log(this.cartDetails, 'qwerty');
    });
  }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe((order: any) => {
      this.orders = order.data;
      console.log(this.orders, 'all orders');
      const matchedRatings = this.check();
      this.now = matchedRatings;
      console.log(matchedRatings, 'toka');
    });
  }

  check() {
    const matchedProducts = [];
    const productName = this.orders;
    console.log(productName, 'why');
    for (const order of this.orders) {
      if (order.attributes.name === this.username) {
        matchedProducts.push(order);
        console.log(order);
      }
    }
    return matchedProducts;
  }


  approveItem(booking: any) {
    const id = booking.id;
    const status = 'Completed';
    const index = this.orders.findIndex((r: any) => r.id === booking.id);
    console.log(index);

    this.orderService.updateItemStatus(id, status).subscribe(
      (res) => {
        console.log(res, 'see console');
        window.location.reload();
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
