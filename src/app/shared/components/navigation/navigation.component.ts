import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { MenuItemModel, MenuItemCategory } from '../../models/menu-item.model';
import { NavigationMenuService } from '../../services/NavigationMenu.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit,OnDestroy,AfterContentInit {



  menuState: Observable<boolean> = new Observable<boolean>();
  menuItems: Observable<MenuItemModel[]> = new Observable<MenuItemModel[]>();
  menuCategory: Observable<MenuItemCategory> = new Observable<MenuItemCategory>();

  constructor(public navigationMenuService: NavigationMenuService, private authService: AuthService) {
  }

  ngOnDestroy(): void {

  }

  ngOnInit() {
    this.menuState = this.navigationMenuService.getMenuToggleState();
  }

  ngAfterContentInit(): void {
    setTimeout(() =>{
      this.menuCategory = this.navigationMenuService.getMenuCategory();
      this.menuItems = this.navigationMenuService.getMenuItems();  
    });
  }

  onLogoutClick(){
    this.authService.logout();
  }


  /*
  NOTE : Handling ExpressionChangedAfterItHasBeenCheckedError

  https://indepth.dev/posts/1001/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error
  */


}
