import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  myBasket;

  minimumAmount: number = 25;
  shipping: number;
  subtotal: number = 0;
  sum: number = 0;

  constructor(public shared: SharedService) { }

  ngOnInit(): void {
    this.getItemsFromLocalStorage();
    console.log(this.shared.basket)
  }

  getItemsFromLocalStorage() {
    this.shared.basket = JSON.parse(window.localStorage.getItem('items'));
    this.getShipping();
    this.getSum();
  }

  getSum() {
    for (let i = 0; i < this.shared.basket.length; i++) {
      const prices = this.shared.basket[i].price;
      this.subtotal += +prices;
    }
    this.getShipping();
    this.sum = this.subtotal + this.shipping;
    console.log(this.sum)
  }

  getShipping() {
    if (this.subtotal < this.minimumAmount) {
      this.shipping = 4.99;
    } else {
      this.shipping = 0;
    }
  }
}