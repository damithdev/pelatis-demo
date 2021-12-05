import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, HostListener, OnDestroy, OnInit, Output } from '@angular/core';
import * as $ from 'jquery';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { NavigationMenuService } from '../../services/NavigationMenu.service';

@Component({
  selector: 'app-navigation-toggle',
  templateUrl: './navigation-toggle.component.html',
  styleUrls: ['./navigation-toggle.component.scss']
})
export class NavigationToggleComponent implements OnInit , OnDestroy{

  menuState$: Observable<boolean>;

  constructor(public navigationMenuService: NavigationMenuService) {
    this.menuState$ = navigationMenuService.getMenuToggleButtonState();
  }
  ngOnDestroy(): void {
  }

  ngOnInit() {
    this.navigationMenuService.fixMenuVisibility(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.navigationMenuService.fixMenuVisibility(event.target.innerWidth);
  }

  toggleButtonClicked() {
    this.navigationMenuService.flipMenuToggleState();
  }

}
