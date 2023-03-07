import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private auth: AuthenticationService,private router: Router,) { }

  ngOnInit(): void {
  }



  logOut(){
    // this.auth.logout().subscribe(
    //   (resp:any) => {
    //     this.router.navigateByUrl('/customer/login')
    //   });
    
  }
}
