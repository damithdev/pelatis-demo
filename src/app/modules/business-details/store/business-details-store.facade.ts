import { Injectable } from "@angular/core";
import { MenuItemCategory, MenuItemModel } from "src/app/shared/models/menu-item.model";
import { NavigationMenuService } from "src/app/shared/services/NavigationMenu.service";
import { select, Store } from "@ngrx/store";
import * as fromReducers from "./reducers";
import * as fromSelectors from "./selectors";
import * as fromActions from "./actions";
import { BusinessModel } from "src/app/shared/models/business.model";
import { BehaviorSubject, ReplaySubject, Subject } from "rxjs";

@Injectable()
export class BusinessDetailsStoreFacade {

    loading$ = this.store.pipe(select(fromSelectors.getLoading));
    loaded$ = this.store.pipe(select(fromSelectors.getLoaded));
    businessData$ = this.store.pipe(select(fromSelectors.getBusinessData));

    constructor(public navigationMenuService: NavigationMenuService, private store: Store<fromReducers.BusinessDetailsState>) { }


    loadBusinessData() {
        this.store.dispatch(fromActions.loadBusinessData());
    }

    addBusiness(business: BusinessModel) {
        console.log("add business store")
        this.store.dispatch(fromActions.addBusiness({ payload: business }))
    }

    updateBusiness(business: BusinessModel) {
        console.log("update business store")
        this.store.dispatch(fromActions.updateBusiness({ payload: business }))
    }



    //////// Selection

    selectedBusiness$ = new ReplaySubject<BusinessModel>()
    changeSelection(business:BusinessModel){
        console.log("change selection")
        this.selectedBusiness$.next(business);
    }

    //////// MENU

    loadMenuItems() {
        this.navigationMenuService.renderMenu(MenuItemCategory.Setting, this._menuItems);
    }

    private _menuItems = [
        new MenuItemModel({ name: 'Profile', path: '#' }),
        new MenuItemModel({ name: 'Password', path: '#' }),
        new MenuItemModel({ name: 'Notifications', path: '#' }),
        new MenuItemModel({ name: 'Businesses', path: 'business/list' }),
    ];
}
