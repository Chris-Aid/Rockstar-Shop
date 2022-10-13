import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  items;
  flipped = false;

  constructor(public shared: SharedService) { }

  ngOnInit(): void {
    this.fethItems();
  }

  fethItems() {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => {
        this.items = json;
        this.addAmount();
      });
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
    }

    window.localStorage.setItem('items', JSON.stringify(this.shared.basket));
    document.getElementById(`product${i}`).style.display = 'flex';
  }

  over(i) {
    document.getElementById(`cardBack${i}`).classList.remove('flipCardBack')
    document.getElementById(`cardBack${i}`).classList.add('addToBasket')
  }

  out(i) {
    document.getElementById(`cardBack${i}`).classList.add('flipCardBack')
    document.getElementById(`cardBack${i}`).classList.remove('addToBasket')
  }
}
