import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { DynamicFormFieldModel } from 'src/app/shared/components/dynamic-form-field/dynamic-form-field.model';

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

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.dynamicForm = this.formBuilder.group({});
    this.dynamicFormFields = [
      {
        id:"name",
        label: "label",
        type: "text",
        value: 'sometext',
        validators :[Validators.required]
      },
      {
        id:"business",
        label: "label",
        type: "select",
        selectMenuOptions: {
          'item1':'value1',
          'item2':'value2'
        },
        value:'item2'
      }
    ]

    this.dynamicFormFields.forEach(formField => {
      const fromControl = this.formBuilder.control(formField.value,formField.validators);
      this.dynamicForm.addControl(formField.id,fromControl)
    });

  }

  onSubmit(form: NgForm) {

    if (!form.valid) {

      return;
    }
  }

}
