import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponse, AuthService } from 'src/app/auth/auth.service';
import { DynamicFormFieldModel } from 'src/app/shared/components/dynamic-form-field/dynamic-form-field.model';
import { BusinessModel } from 'src/app/shared/models/business.model';
import { OnboardModel } from 'src/app/shared/models/onboard.model';
import { OnboardingService } from './onboarding.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent implements OnInit {

  dynamicFormFields!: DynamicFormFieldModel[];
  dynamicForm!: FormGroup;

  error!: string | null;
  isLoading = false;

  onboardData!: OnboardModel;

  constructor(private formBuilder: FormBuilder,private service: OnboardingService,private authService:AuthService) { }

  ngOnInit(): void {
    this.dynamicForm = this.formBuilder.group({});
    this.service.initializeFormData();
    this.dynamicFormFields = this.service.onboardData.dynamicFormFields;
    this.onboardData = this.service.onboardData;
    this.dynamicFormFields.forEach(formField => {
      const fromControl = this.formBuilder.control(formField.value,formField.validators);
      this.dynamicForm.addControl(formField.id,fromControl)
    });
    console.log(this.onboardData)

  }

  onSubmit() {

    if (!this.dynamicForm.valid) {
      console.log("invalid")
      return;
    }
    console.log("sunbmitting")

    if(this.onboardData.step == 1){
      this.isLoading = true;
      let onboardObs : Observable<AuthResponse>;

  
      const value = this.dynamicForm.value;
      onboardObs = this.service.pushUserData(value.firstName,value.lastName);

      onboardObs.subscribe(
        data => {
          this.isLoading = false;
        },
        error => {
          console.log(error.error);
          if( !(error.error instanceof ProgressEvent) && error.error != null){
            this.error = error.error;
          }else{
            this.error = "An Error Occurred! "
          }
          this.isLoading = false;
        }
      );
    }else if(this.onboardData.step == 2){
      this.isLoading = true;
      let onboardObs : Observable<BusinessModel>;
      const value = this.dynamicForm.value;

      onboardObs = this.service.pushBusinessData(value.companyName,value.typeOfBusiness,value.country,value.currency);

  
      onboardObs.subscribe(
        data => {
          this.isLoading = false;
        },
        error => {
          console.log(error.error);
          if( !(error.error instanceof ProgressEvent) && error.error != null){
            this.error = error.error;
          }else{
            this.error = "An Error Occurred! "
          }
          this.isLoading = false;
        }
      );
    }

    
  }

}
