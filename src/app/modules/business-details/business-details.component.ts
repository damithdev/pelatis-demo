import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubSink } from 'subsink';
import { BusinessDetailsStoreFacade } from './store/business-details-store.facade';

@Component({
  selector: 'app-business-details',
  templateUrl: './business-details.component.html',
  styleUrls: ['./business-details.component.scss']
})
export class BusinessDetailsComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  type!:String;

  constructor(private facade:BusinessDetailsStoreFacade,private route:ActivatedRoute) { }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit() {
    this.facade.loadMenuItems();
    this.subs.sink = this.route.params.subscribe(
      params => {
        this.type = params['action'];
      }
    )
  }

}
