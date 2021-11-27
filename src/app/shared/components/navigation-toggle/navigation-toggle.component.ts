import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, HostListener, OnInit, Output } from '@angular/core';
import * as $ from 'jquery';
import { Observable } from 'rxjs';
import { NavigationMenuService } from '../../services/NavigationMenu.service';

@Component({
  selector: 'app-navigation-toggle',
  templateUrl: './navigation-toggle.component.html',
  styleUrls: ['./navigation-toggle.component.scss']
})
export class NavigationToggleComponent implements OnInit {
  
  menuState : Observable<boolean>;
  constructor(public navigationMenuService:NavigationMenuService) { 
    this.menuState = navigationMenuService.getMenuToggleButtonState();
  }

  ngOnInit() {
    this.navigationMenuService.fixMenuVisibility(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event : any) {
    this.navigationMenuService.fixMenuVisibility(event.target.innerWidth);
  }
  
  toggleButtonClicked(){
    this.navigationMenuService.flipMenuToggleState();
  }

}
