import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BusinessModel } from 'src/app/shared/models/business.model';
import { BusinessDetailsStoreFacade } from '../store/business-details-store.facade';

@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.scss']
})
export class BusinessListComponent implements OnInit {

  businesses$: Observable<BusinessModel[]> | undefined;

  constructor(private facade:BusinessDetailsStoreFacade,private router:Router) { }

  ngOnInit() {
    this.facade.loadMenuItems();
    this.businesses$ = this.facade.businessData$;
    this.facade.businessData$.subscribe( data => {
      console.log(data);
    })

    this.facade.loadBusinessData();
  }

  editBusiness(business:BusinessModel){
    this.facade.changeSelection(business);
    this.router.navigate(['/business','edit']);

  }
}
