import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  myBasket;

  constructor(public shared: SharedService) { }

  ngOnInit(): void {
    this.getItemsFromLocalStorage()
    console.log(this.shared.basket)
  }

  getItemsFromLocalStorage() {
    this.myBasket = JSON.parse(window.localStorage.getItem('items'));
  }

}
