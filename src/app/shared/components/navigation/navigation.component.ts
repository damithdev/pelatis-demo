import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { MenuItem, MenuItemCategory } from '../../models/menu-item.model';
import { NavigationMenuService } from '../../services/NavigationMenu.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit,OnDestroy {



  menuState: Observable<boolean> = new Observable<boolean>();
  menuItems: Observable<MenuItem[]> = new Observable<MenuItem[]>();
  menuCategory: Observable<MenuItemCategory> = new Observable<MenuItemCategory>();

  constructor(public navigationMenuService: NavigationMenuService, private authService: AuthService) {
    this.menuState = this.navigationMenuService.getMenuToggleState();
    this.menuCategory = this.navigationMenuService.getMenuCategory();
    this.menuItems = this.navigationMenuService.getMenuItems();
  }
  ngOnDestroy(): void {
  }

  ngOnInit() {

  }

  onLogoutClick(){
    this.authService.logout();
  }

}
