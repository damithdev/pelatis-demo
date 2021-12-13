import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MenuItemModel, MenuItemCategory } from 'src/app/shared/models/menu-item.model';
import { NavigationMenuService } from 'src/app/shared/services/NavigationMenu.service';
import * as fromActions from './actions';
import * as fromReducers from './reducers';
import * as fromSelectors from './selectors';


@Injectable()
export class BusinessDashboardFacade{
    
    loading$ = this.store.pipe(select(fromSelectors.getLoading));
    cashFlowData$ = this.store.pipe(select(fromSelectors.getCashFlowData));
    netIncomeData$ = this.store.pipe(select(fromSelectors.getNetIncomeData));

    constructor(public navigationMenuService:NavigationMenuService,private store: Store<fromReducers.BusinessDashbaordState>) {}


    loadInvoiceData(){
        this.store.dispatch(fromActions.loadInvoiceData())
    }

    loadMenuItems(){
        this.navigationMenuService.renderMenu(MenuItemCategory.Home,this._menuItems);
    }

    getCanDoItems():MenuItemModel[]{
        return this._canDoItems;
    }



    private _menuItems = [
        new MenuItemModel({name: 'Home',path:'#',icon:'ri-home-2-line'}),
        new MenuItemModel({name: 'Sales',path:'#',icon:'ri-bank-card-line'}),
        new MenuItemModel({name: 'Reports',path:'#',icon:'ri-pie-chart-2-line'}),
    ];

    private _canDoItems = [
        new MenuItemModel({name: 'Add a customer',path:'#'}),
        new MenuItemModel({name: 'Add a vendor',path:'#'}),
        new MenuItemModel({name: 'Customize your invoices',path:'#'}),
        new MenuItemModel({name: 'Invite a guest collaborator',path:'#'}),
    ];

    
}