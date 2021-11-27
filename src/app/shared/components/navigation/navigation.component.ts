import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuItem, MenuItemCategory } from '../../models/menu-item.model';
import { NavigationMenuService } from '../../services/NavigationMenu.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  menuState : Observable<boolean>;
  menuItems : Observable<MenuItem[]>;
  menuCategory : Observable<MenuItemCategory>;
  constructor(public navigationMenuService:NavigationMenuService) { 
    this.menuState = navigationMenuService.getMenuToggleState();
    this.menuCategory =navigationMenuService.getMenuCategory();
    this.menuItems = navigationMenuService.getMenuItems();
  }

  ngOnInit() {

  }

}
