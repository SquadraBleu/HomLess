import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public urlImagenes: string[];

  constructor() { }

  ngOnInit(): void {
    this.urlImagenes = ['assets/images/Hom1-100.jpg', 'assets/images/Hom2-100.jpg', 'assets/images/Hom3-100.jpg'];
  }



}
