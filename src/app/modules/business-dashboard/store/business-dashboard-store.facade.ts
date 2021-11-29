import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MenuItem, MenuItemCategory } from 'src/app/shared/models/menu-item.model';
import { NavigationMenuService } from 'src/app/shared/services/NavigationMenu.service';
import * as fromActions from './actions';
import * as fromReducers from './reducers';
import * as fromSelectors from './selectors';


@Injectable({ providedIn: 'root' })
export class BusinessDashboardFacade{
    loading$ = this.store.pipe(select(fromSelectors.getLoading));
    cashFlowData$ = this.store.pipe(select(fromSelectors.getCashFlowData));
    netIncomeData$ = this.store.pipe(select(fromSelectors.getNetIncomeData));
    constructor(public navigationMenuService:NavigationMenuService,private store: Store<fromReducers.BusinessDashbaordState>) {}


    loadInvoiceData(){
        this.store.dispatch(fromActions.loadInvoiceData())
    }

    loadMenuItems(){
        this.navigationMenuService.renderMenu(MenuItemCategory.Home,this.menuItems);
    }

    getCanDoItems():MenuItem[]{
        return this.canDoItems;
    }



    menuItems = [
        new MenuItem({name: 'Home',path:'#',icon:'ri-home-2-line'}),
        new MenuItem({name: 'Sales',path:'#',icon:'ri-bank-card-line'}),
        new MenuItem({name: 'Reports',path:'#',icon:'ri-pie-chart-2-line'}),
    ];

    canDoItems = [
        new MenuItem({name: 'Add a customer',path:'#'}),
        new MenuItem({name: 'Add a vendor',path:'#'}),
        new MenuItem({name: 'Customize your invoices',path:'#'}),
        new MenuItem({name: 'Invite a guest collaborator',path:'#'}),
    ];

    
}