import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AuthResponse } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';
import { CustomerModel } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerDataService {

  constructor(private http:HttpClient) { }

  addCustomer(name:string,email:string,phone:string,businessId:number){
    return this.http.post<CustomerModel>(
      environment.baseUrl+'Customer/add', {
        name: name,
        email: email,
        phone: phone,
        businessId: businessId
    });
  }

  getCustomers() {
    return this.http.get<CustomerModel[]>(
      environment.baseUrl+'Customer/GetCustomersForUser'
    );
  }

  getCustomerForBusiness(businessId:number) {
    return this.http.get<CustomerModel[]>(
      environment.baseUrl+'Customer/GetCustomersForBusiness',
      {
        params: {
          id: businessId
        }
      }
    );
  }

  getCustomer(customerId:number) {
    return this.http.get<CustomerModel[]>(
      environment.baseUrl+'Customer/GetCustomer',
      {
        params: {
          id: customerId
        }
      }
    );
  }

  

  editCustomer(name:string,email:string,phone:string,customerId:number){
    return this.http.post<CustomerModel>(
      environment.baseUrl+'Customer/edit', {
        name: name,
        email: email,
        phone: phone,
        id: customerId
    });
  }

}
