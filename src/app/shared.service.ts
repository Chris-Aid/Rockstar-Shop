import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  basket = [];

  constructor() { }

  // getItems() {
  //   return JSON.parse(window.localStorage.getItem('items'))
  // }
}
