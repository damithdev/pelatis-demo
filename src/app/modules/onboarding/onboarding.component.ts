import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponse, AuthService } from 'src/app/auth/auth.service';
import { DynamicFormFieldModel } from 'src/app/shared/components/dynamic-form-field/dynamic-form-field.model';
import { BusinessModel } from 'src/app/shared/models/business.model';
import { UserModel } from 'src/app/shared/models/user.model';
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

  step!: number;
  user!: UserModel;
  business!: BusinessModel;
  constructor(private formBuilder: FormBuilder, private service: OnboardingService, private authService: AuthService) { }

  ngOnInit(): void {
    this.service.initializeFormData();
    this.buildForm();
  }

  buildForm(){
    this.dynamicForm = this.formBuilder.group({});
    this.dynamicFormFields = this.service.dynamicFormFields;
    this.step = this.service.step;
    this.user = this.service.user;
    this.business = this.service.business;

    this.dynamicFormFields.forEach(formField => {
      const fromControl = this.formBuilder.control(formField.value, formField.validators);
      this.dynamicForm.addControl(formField.id, fromControl)
    });

  }

  onSubmit() {

    if (!this.dynamicForm.valid) {
      console.log("invalid")
      return;
    }
    console.log("sunbmitting")

    if (this.step == 1) {
      this.isLoading = true;
      let onboardObs: Observable<AuthResponse>;


      const value = this.dynamicForm.value;
      onboardObs = this.service.pushUserData(value.firstName, value.lastName);

      onboardObs.subscribe(
        data => {
          this.isLoading = false;
          this.buildForm();

        },
        error => {
          console.log(error.error);
          if (!(error.error instanceof ProgressEvent) && error.error != null) {
            this.error = error.error;
          } else {
            this.error = "An Error Occurred! "
          }
          this.isLoading = false;
        }
      );
    } else if (this.step == 2) {
      this.isLoading = true;
      let onboardObs: Observable<BusinessModel>;
      const value = this.dynamicForm.value;

      onboardObs = this.service.pushBusinessData(value.companyName, value.typeOfBusiness, value.country, value.currency);


      onboardObs.subscribe(
        data => {
          this.isLoading = false;
          this.buildForm();

        },
        error => {
          console.log(error.error);
          if (!(error.error instanceof ProgressEvent) && error.error != null) {
            this.error = error.error;
          } else {
            this.error = "An Error Occurred! "
          }
          this.isLoading = false;
        }
      );
    }


  }

}
