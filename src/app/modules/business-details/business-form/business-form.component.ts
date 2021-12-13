import { AfterContentInit, Component, OnInit } from '@angular/core';
import { BusinessDetailsFacade } from '../store/business-details.facade';

@Component({
  selector: 'app-business-form',
  templateUrl: './business-form.component.html',
  styleUrls: ['./business-form.component.scss']
})
export class BusinessFormComponent implements OnInit,AfterContentInit {

  constructor(private facade:BusinessDetailsFacade) { }

  ngAfterContentInit(): void {
  }

  ngOnInit() {
    this.facade.loadMenuItems();

  }

}
