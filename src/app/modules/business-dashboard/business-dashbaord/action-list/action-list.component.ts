import { Component, Input, OnInit } from '@angular/core';
import { MenuItemModel } from 'src/app/shared/models/menu-item.model';
import { BusinessDashboardFacade } from '../../store/business-dashboard-store.facade';

@Component({
  selector: 'app-action-list',
  templateUrl: './action-list.component.html',
  styleUrls: ['./action-list.component.scss']
})
export class ActionListComponent implements OnInit {

  @Input() canDoItems: MenuItemModel[] = [];
  ngOnInit(){

  }

}
