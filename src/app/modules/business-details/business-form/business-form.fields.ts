import { Validators } from '@angular/forms';
import { DynamicFormFieldModel } from 'src/app/shared/components/dynamic-form-field/dynamic-form-field.model';


export const companyNameField: DynamicFormFieldModel = { id: "companyName", label: "Company Name", type: "text", value: "", validators: [Validators.required] };
export const  typeOfBusinessField: DynamicFormFieldModel = {
    id: "typeOfBusiness",
    label: "Type of Business",
    type: "select",
    selectMenuOptions: {
      'health': 'Health and beauty',
      'it': 'Web, Tech, IT',
      'food': 'Restaurants & Foods'
    },
    validators: [Validators.required]
  };
export const  countryField: DynamicFormFieldModel = {
    id: "country",
    label: "Country",
    type: "select",
    selectMenuOptions: {
      'LK': 'Sri Lanka',
      'USA': 'United States',
      'IRE': 'Ireland'
    },
    validators: []
  };

export const  currencyField: DynamicFormFieldModel = {
    id: "currency",
    label: "Business Currency",
    type: "select",
    selectMenuOptions: {
      'LKR': 'LKR',
      'USD': 'USD',
      'EUR': 'EURO'
    },
    validators: []
  };