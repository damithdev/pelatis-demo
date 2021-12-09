import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DynamicFormFieldModel } from 'src/app/shared/components/dynamic-form-field/dynamic-form-field.model';
import { OnboardModel } from 'src/app/shared/models/onboard.model';
import { AuthResponse, AuthService } from 'src/app/auth/auth.service';
import { BusinessModel } from 'src/app/shared/models/business.model';
import { Validators } from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { BusinessApiClientServiceService } from 'src/app/shared/data/BusinessApiClientService.service';
import { Constants } from 'src/app/shared/utility/Constants';

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {

  onboardData!: OnboardModel;
  constructor(private http: HttpClient, private authService: AuthService,private businessService:BusinessApiClientServiceService) { }

  updateOnboardData(formData: DynamicFormFieldModel[]) {

  }

  getFormFields() {

  }

  initializeFormData() {
    this.authService.user.subscribe(u => {
      this.onboardData = new OnboardModel(0, [], u, null)
      this.onboardData.user = u;
      console.warn("here")

      if (u.firstName == null || u.lastName == null) {
        console.log("here")
        this.onboardData.step = 1;
        this.onboardData.dynamicFormFields = [
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
      } else if (!u.defaultBusinessId) {

        this.onboardData.step = 2;
        this.onboardData.dynamicFormFields = [
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
              'item1': 'value1',
              'item2': 'value2'
            },
            validators: [Validators.required]
          },
          {
            id: "country",
            label: "Country",
            type: "select",
            selectMenuOptions: {
              'item1': 'value1',
              'item2': 'value2'
            },
            validators: []
          },
          {
            id: "currency",
            label: "Business Currency",
            type: "select",
            selectMenuOptions: {
              'item1': 'value1',
              'item2': 'value2'
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
      Constants.API_ENDPOINT+'AppUsers/onboard', {
      firstName: firstName,
      lastName: lastName,
      email: this.onboardData.user?.email
    }
    ).pipe(
      tap(data => {
        this.authService.updateUserData(data);
      })
    );


  }

  pushBusinessData(comapny:string,type:string,country:string,currency:string) {
    return this.http.post<BusinessModel>(
      Constants.API_ENDPOINT+'Business/add', {
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
