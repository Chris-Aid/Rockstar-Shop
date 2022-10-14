import { Component, ElementRef, HostListener, OnInit, setTestabilityGetter, ViewChild } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  constructor(public shared: SharedService) { }

  items;
  flipped = false;
  itemsLimit = 10;
  maxItems = false;

  ngOnInit(): void {
    this.fethItems();
    this.getItemsFromLocalStorage();
  }


  // fetches first ten items of shopping API and pushes them to array
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

  // function updates objects that are stored in array and adds amount for price calculation
  addAmount() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      item['amount'] = 1;
    }
  }

  saveToBasket(i) {
    // finding out if item was already pushed to basket
    const alreadyExists = this.shared.basket.some(element => {
      if (element.id === this.items[i].id) {
        return true;
      }
      return false;
    });

    // if the item is already in the shopping cart the quantity will be increased
    if (!alreadyExists) {
      this.shared.basket.push(this.items[i]);
    } else {
      this.increaseAmount(i)
    }

    window.localStorage.setItem('items', JSON.stringify(this.shared.basket));
  }

  // function figures out which item was clicket and increased right amount
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

  // increases limit of fetched items 
  moreItems() {
    this.maxItems = true;
    this.itemsLimit = 20;
    this.fethItems();
  }

  // reduces limit of fetched items 
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

  // function finds out the amount of each product in basket
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
