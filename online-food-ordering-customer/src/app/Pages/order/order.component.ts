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
  complete:any[] = [];
  Delivering:any[] = [];
  approved:any[] = []
  public username = localStorage.getItem('s_username');

  constructor(private orderService: OrdersService) {}

  public selector(id: any) {
    this.orderService.getOrderByName(id).subscribe((booking: any) => {
      this.order = booking.data;
      this.cartDetails = this.order.attributes.cartDetails;
      console.log(this.cartDetails, 'qwerty');
    });
  }

  tab: string = 'order';

  setTab(tab: string){
    this.tab = tab;
  }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe((booking: any) => {
      this.orders = booking.data;
      this.orders = booking.data.filter((order: any) => order.attributes.status === "Pending");
      this.approved = booking.data.filter((order: any) => order.attributes.status === "Approved");
    this.complete = booking.data.filter((order: any) => order.attributes.status === "Completed");
    this.Delivering = booking.data.filter((order: any) => order.attributes.status === "Delivering");
      console.log(this.orders, 'all orders');
      console.log(this.approved,"approved");
      console.log(this.complete,"complete");
      console.log(this.Delivering,"on going");
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
