import { Component, ElementRef, HostListener, OnInit, setTestabilityGetter, ViewChild } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  hover: boolean = false;

  constructor(public shared: SharedService) { }

  items;
  flipped = false;
  itemsLimit = 10;
  maxItems = false;


  ngOnInit(): void {
    this.fethItems();
    this.getItemsFromLocalStorage();
  }

  fethItems() {
    fetch(`https://fakestoreapi.com/products?limit=${this.itemsLimit}`)
      .then(res => res.json())
      .then(json => {
        this.items = json;
        this.addAmount();
      });
  }

  getItemsFromLocalStorage() {
    this.shared.basket = JSON.parse(window.localStorage.getItem('items'));
  }

  addAmount() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      item['amount'] = 1;
    }
  }

  saveToBasket(i) {
    const alreadyExists = this.shared.basket.some(element => {
      if (element.id === this.items[i].id) {
        return true;
      }
      return false;
    });

    if (!alreadyExists) {
      this.shared.basket.push(this.items[i]);
    } else {
      this.increaseAmount(i)
    }

    window.localStorage.setItem('items', JSON.stringify(this.shared.basket));
  }

  increaseAmount(i) {
    for (let j = 0; j < this.shared.basket.length; j++) {
      const basketItem = this.shared.basket[j];

      if (this.items[i].title == basketItem.title) {
        let currentAmount = basketItem.amount;
        currentAmount++;
        this.shared.basket[j]['amount'] = currentAmount;
      }
    }
  }

  moreItems() {
    this.maxItems = true;
    this.itemsLimit = 20;
    this.fethItems();
  }

  lessItems() {
    this.maxItems = false;
    this.itemsLimit = 10;
    this.fethItems();
  }

  over(i) {
    document.getElementById(`cardBack${i}`).classList.remove('moveCardBack')
    document.getElementById(`cardBack${i}`).classList.add('addToBasket')
  }

  out(i) {
    document.getElementById(`cardBack${i}`).classList.add('moveCardBack')
    document.getElementById(`cardBack${i}`).classList.remove('addToBasket')
  }

  getAmount(i) {
    for (let j = 0; j < this.shared.basket.length; j++) {
      const basketItem = this.shared.basket[j];

      if (this.items[i].title == basketItem.title) {
        let currentAmount = basketItem.amount;
        return currentAmount;
      }
    }
  }
}
