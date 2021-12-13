import { AfterContentInit, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Colors } from 'src/constants/colors.constants';
import { MenuItemModel, MenuItemCategory } from '../../models/menu-item.model';
import { UserModel } from '../../models/user.model';
import { NavigationMenuService } from '../../services/NavigationMenu.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit,OnDestroy,AfterContentInit {


  user!: UserModel;
  menuState$: Observable<boolean> = new Observable<boolean>();
  menuItems$: Observable<MenuItemModel[]> = new Observable<MenuItemModel[]>();
  menuCategory$: Observable<MenuItemCategory> = new Observable<MenuItemCategory>();

  constructor(public navigationMenuService: NavigationMenuService, private authService: AuthService,private elementRef:ElementRef) {
  }

  ngOnDestroy(): void {

  }

  ngOnInit() {
    this.menuState$ = this.navigationMenuService.getMenuToggleState();
    this.authService.user.subscribe(u => {
      this.user = u;
    });
  }

  ngAfterContentInit(): void {
    setTimeout(() =>{
      this.menuCategory$ = this.navigationMenuService.getMenuCategory();
      this.menuItems$ = this.navigationMenuService.getMenuItems();

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
