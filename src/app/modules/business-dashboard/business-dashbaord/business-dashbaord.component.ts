import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BusinessDashboardFacade } from '../store/business-dashboard-store.facade';

@Component({
  selector: 'app-business-dashbaord',
  templateUrl: './business-dashbaord.component.html',
  styleUrls: ['./business-dashbaord.component.scss']
})
export class BusinessDashbaordComponent implements OnInit {

  constructor(private facade:BusinessDashboardFacade) { }

  ngOnInit(): void {
    this.facade.loadMenuItems();
  }

}
