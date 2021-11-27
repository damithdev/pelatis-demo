import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { MenuItem, MenuItemCategory } from 'src/app/shared/models/menu-item.model';
import { NavigationMenuService } from 'src/app/shared/services/NavigationMenu.service';

@Injectable({ providedIn: 'root' })
export class BusinessDashboardFacade{
    constructor(public navigationMenuService:NavigationMenuService) {}

    menuItems = [
        new MenuItem({name: 'Home',path:'home',icon:'home'}),
        new MenuItem({name: 'Sales',path:'sales',icon:'credit-card'}),
        new MenuItem({name: 'Reports',path:'reports',icon:'reports'}),
    ];

    loadMenuItems(){
        this.navigationMenuService.renderMenu(MenuItemCategory.Home,this.menuItems);
    }
    
}