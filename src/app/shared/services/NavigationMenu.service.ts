import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { MenuItem, MenuItemCategory } from '../models/menu-item.model';

@Injectable({
  providedIn: 'root'
})
export class NavigationMenuService {

  constructor() { }
  
  private menuToggleState = new BehaviorSubject<boolean>(true);
  private menuToggleButtonState = new BehaviorSubject<boolean>(true);
  private menuItems = new BehaviorSubject<MenuItem[]>([]);
  private menuCategory = new BehaviorSubject<MenuItemCategory>(MenuItemCategory.Home);

  fixMenuVisibility(innerWidth:number){
    this.changeMenuToggleState(innerWidth>768);
    this.changeMenuToggleButtonState(innerWidth<=768);
  }

  changeMenuToggleState(state:boolean){
    this.menuToggleState.next(state);
  }

  changeMenuToggleButtonState(state:boolean){
    this.menuToggleButtonState.next(state);
  }

  getMenuToggleButtonState(){
    return this.menuToggleButtonState.asObservable();
  }

  getMenuToggleState(){
    return this.menuToggleState.asObservable();
  }

  flipMenuToggleState(){    
    this.menuToggleState.asObservable().pipe(take(1)).subscribe(value => {
      this.changeMenuToggleState(!value)
    })
  }

  renderMenu(category: MenuItemCategory, items: MenuItem[]){
    this.menuCategory.next(category);
    this.menuItems.next(items);
  }

  getMenuCategory(){
    return this.menuCategory.asObservable();
  }

  getMenuItems(){
    return this.menuItems.asObservable();
  }
}
