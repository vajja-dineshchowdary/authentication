import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }
  logo: any;
  user: any;
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('User'));
    console.log(this.user);
    this.logo = `http://localhost:8626/public/uploads/${this.user.image}`;
  }

}
