import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public totalItem : number = 1;
  public searchTerm !: string;
  constructor(private cartService : CartService) { }

  ngOnInit(): void {
   
  }

}
