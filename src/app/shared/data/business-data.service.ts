import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AuthResponse } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';
import { BusinessModel } from '../models/business.model';

@Injectable({
  providedIn: 'root'
})
export class BusinessDataService {

  constructor(private http:HttpClient) { }

  getBusinesses() {
    return this.http.get<BusinessModel[]>(
      environment.baseUrl+'Business/GetBusinessesForUser'
    );
  }

  getBusinessForId(businessId:number) {
    return this.http.get<BusinessModel[]>(
      environment.baseUrl+'Business/GetBusinessesForUser',
      {
        params: {
          id: businessId
        }
      }
    );
  }

  addBusiness(comapny:string,type:string,country:string,currency:string){
    console.log("add business service")
    return this.http.post<BusinessModel>(
      environment.baseUrl+'Business/add', {
        companyName: comapny,
        typeOfBusiness: type,
        country: country,
        currency: currency
    });
  }

  editBusiness(businessId:number,comapny:string,type:string,country:string,currency:string){
    return this.http.post<BusinessModel>(
      environment.baseUrl+'Business/edit', {
        businessId:businessId,
        companyName: comapny,
        typeOfBusiness: type,
        country: country,
        currency: currency
    });
  }

  switchDefaultBusinessForId(businessId:number) {
    return this.http.get<BusinessModel[]>(
      environment.baseUrl+'Business/SwitchDefaultBusiness',
      {
        params: {
          id: businessId
        }
      }
    );
  }

}
