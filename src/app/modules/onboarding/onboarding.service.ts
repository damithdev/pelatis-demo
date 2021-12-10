import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DynamicFormFieldModel } from 'src/app/shared/components/dynamic-form-field/dynamic-form-field.model';
import { AuthResponse, AuthService } from 'src/app/auth/auth.service';
import { BusinessModel } from 'src/app/shared/models/business.model';
import { Validators } from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { BusinessApiClientServiceService } from 'src/app/shared/data/BusinessApiClientService.service';
import { Constants } from 'src/app/shared/utility/Constants';
import { UserModel } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {

  step!:number;
  dynamicFormFields!: DynamicFormFieldModel[];
  user!:UserModel;
  business!:BusinessModel;
  
  constructor(private http: HttpClient, private authService: AuthService,private businessService:BusinessApiClientServiceService) { }

  updateOnboardData(formData: DynamicFormFieldModel[]) {

  }

  getFormFields() {

  }

  initializeFormData() {
    this.authService.user.subscribe(u => {
      this.user = u;
      console.log("user updated")
      console.warn(u)

      if (u.firstName == null || u.lastName == null) {
        console.log("user data")
        this.step = 1;
        this.dynamicFormFields = [
          {
            id: "firstName",
            label: "First Name",
            type: "text",
            value: u.firstName,
            validators: [Validators.required]
          }, {
            id: "lastName",
            label: "Last Name",
            type: "text",
            value: u.lastName,
            validators: [Validators.required]
          },
        ];
      } else if (!u.defaultBusinessId || u.defaultBusinessId == 0) {
        console.log("business data")

        this.step = 2;
        this.dynamicFormFields = [
          {
            id: "companyName",
            label: "Comapny Name",
            type: "text",
            validators: [Validators.required]
          }, {
            id: "typeOfBusiness",
            label: "Type of Business",
            type: "select",
            selectMenuOptions: {
              'health': 'Health and beauty',
              'it': 'Web, Tech, IT',
              'food': 'Restaurants & Foods'
            },
            validators: [Validators.required]
          },
          {
            id: "country",
            label: "Country",
            type: "select",
            selectMenuOptions: {
              'LK': 'Sri Lanka',
              'USA': 'United States',
              'IRE': 'Ireland'
            },
            validators: []
          },
          {
            id: "currency",
            label: "Business Currency",
            type: "select",
            selectMenuOptions: {
              'LKR': 'LKR',
              'USD': 'USD',
              'EUR': 'EURO'
            },
            validators: []
          },
        ];
      }
    });
  }

  pushUserData(firstName: string, lastName: string) {
    console.log(firstName + lastName)

    return this.http.post<AuthResponse>(
      environment.baseUrl+'AppUsers/onboard', {
      firstName: firstName,
      lastName: lastName,
      email: this.user?.email
    }
    ).pipe(
      tap(data => {
        this.authService.updateUserData(data);
      })
    );


  }

  pushBusinessData(comapny:string,type:string,country:string,currency:string) {
    return this.http.post<BusinessModel>(
      environment.baseUrl+'Business/add', {
        companyName: comapny,
        typeOfBusiness: type,
        country: country,
        currency: currency
    }
    ).pipe(
      tap(data => {
        console.log(data)
        this.authService.fetch().subscribe( data => {
          console.log(data)
        })
      })
    );
  }

}
