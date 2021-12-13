import { Injectable } from "@angular/core";
import { MenuItemCategory, MenuItemModel } from "src/app/shared/models/menu-item.model";
import { NavigationMenuService } from "src/app/shared/services/NavigationMenu.service";

@Injectable()
export class BusinessDetailsFacade {
    
    constructor(public navigationMenuService:NavigationMenuService){}

    loadMenuItems(){
        this.navigationMenuService.renderMenu(MenuItemCategory.Setting,this._menuItems);
    }

    private _menuItems = [
        new MenuItemModel({name: 'Profile',path:'#'}),
        new MenuItemModel({name: 'Password',path:'#'}),
        new MenuItemModel({name: 'Notifications',path:'#'}),
        new MenuItemModel({name: 'Businesses',path:'#'}),
    ];
}
