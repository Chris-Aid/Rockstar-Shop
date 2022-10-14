import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {


  amount: number = 1;

  minimumAmount: number = 100;
  shipping: number;
  subtotal: number = 0;
  sum: number = 0;

  constructor(public shared: SharedService) { }

  ngOnInit(): void {
    this.getItemsFromLocalStorage();
  }

  getItemsFromLocalStorage() {
    this.shared.basket = JSON.parse(window.localStorage.getItem('items'));
    this.getShipping();
    this.getSum();
  }

  getSum() {
    this.subtotal = 0;
    for (let i = 0; i < this.shared.basket.length; i++) {
      const prices = this.shared.basket[i].price;
      const amounts = this.shared.basket[i].amount;
      this.subtotal += +prices * amounts;
    }

    this.getShipping();
    this.sum = this.subtotal + this.shipping;
    window.localStorage.setItem('items', JSON.stringify(this.shared.basket));
  }

  getShipping() {
    if (this.subtotal < this.minimumAmount && this.subtotal > 0) {
      this.shipping = 4.99;
    } else {
      this.shipping = 0;
    }
  }

  increaseAmount(i) {
    let a = this.shared.basket[i]['amount'];
    a++
    this.shared.basket[i]['amount'] = a;
    this.getSum();
  }

  reduceAmount(i) {
    if (this.shared.basket[i].amount > 1) {
      let a = this.shared.basket[i].amount;
      a--;
      this.shared.basket[i]['amount'] = a;
    } else {
      this.shared.basket.splice(i, 1)
    }

    this.getSum();
  }
}