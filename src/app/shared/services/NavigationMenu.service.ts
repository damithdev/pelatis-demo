import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { MenuItemModel, MenuItemCategory } from '../models/menu-item.model';

@Injectable({
  providedIn: 'root'
})
export class NavigationMenuService {

  constructor() { }
  
  private _menuToggleState$ = new BehaviorSubject<boolean>(true);
  private _menuToggleButtonState$ = new BehaviorSubject<boolean>(true);
  private _menuItems$ = new BehaviorSubject<MenuItemModel[]>([]);
  private _menuCategory$ = new BehaviorSubject<MenuItemCategory>(MenuItemCategory.Home);

  fixMenuVisibility(innerWidth:number){
    this.changeMenuToggleState(innerWidth>768);
    this.changeMenuToggleButtonState(innerWidth<=768);
  }

  changeMenuToggleState(state:boolean){
    this._menuToggleState$.next(state);
  }

  changeMenuToggleButtonState(state:boolean){
    this._menuToggleButtonState$.next(state);
  }

  getMenuToggleButtonState(){
    return this._menuToggleButtonState$.asObservable();
  }

  getMenuToggleState(){
    return this._menuToggleState$.asObservable();
  }

  flipMenuToggleState(){    
    this._menuToggleState$.asObservable().pipe(take(1)).subscribe(value => {
      this.changeMenuToggleState(!value)
    })
  }

  renderMenu(category: MenuItemCategory, items: MenuItemModel[]){
    setTimeout(() =>{
      this._menuCategory$.next(category);
      this._menuItems$.next(items);
    });
  }

  getMenuCategory(){
    return this._menuCategory$.asObservable();
  }

  getMenuItems(){
    return this._menuItems$.asObservable();
  }
}
