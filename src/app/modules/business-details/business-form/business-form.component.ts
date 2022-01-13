import { AfterContentInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { DynamicFormFieldModel } from 'src/app/shared/components/dynamic-form-field/dynamic-form-field.model';
import { BusinessModel } from 'src/app/shared/models/business.model';
import { SubSink } from 'subsink';
import { BusinessDetailsStoreFacade } from '../store/business-details-store.facade';
import * as formFields from './business-form.fields';

@Component({
  selector: 'app-business-form',
  templateUrl: './business-form.component.html',
  styleUrls: ['./business-form.component.scss']
})
export class BusinessFormComponent implements OnInit,OnDestroy {
  private subs = new SubSink();

  @Output() formCloseEvent = new EventEmitter();

  @Input() isEdit = false;
  isLoading = false;
  dynamicForm!: FormGroup;
  companyNameField = formFields.companyNameField;
  typeOfBusinessField = formFields.typeOfBusinessField;
  countryField = formFields.countryField;
  currencyField = formFields.currencyField;
  selectedBusiness!:BusinessModel;

  constructor(private formBuilder: FormBuilder,private facade:BusinessDetailsStoreFacade) { }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }


  ngOnInit(): void {
    this.facade.loadMenuItems();
    this.dynamicForm = this.formBuilder.group({});
    this.addField(formFields.companyNameField);
    this.addField(formFields.typeOfBusinessField);
    this.addField(formFields.countryField);
    this.addField(formFields.currencyField);
    
    if(this.isEdit){
      console.log("is edit")
      this.subs.sink = this.facade.selectedBusiness$.subscribe(
        business => {
          this.selectedBusiness = business;
          console.log(business)
          this.dynamicForm.setValue({
            companyName : business.companyName,
            typeOfBusiness : business.typeOfBusiness,
            country : business.country,
            currency : business.currency,
          });
        }
      )
    }
  }

  addField(field: DynamicFormFieldModel) {
    this.dynamicForm.addControl(field.id, this.formBuilder.control(field.value, field.validators));
  }

  onSubmit(){
    console.log("submit")
    let business  = {} as BusinessModel; 
    business.companyName = this.dynamicForm.value.companyName;
    business.typeOfBusiness = this.dynamicForm.value.typeOfBusiness;
    business.country = this.dynamicForm.value.country;
    business.currency = this.dynamicForm.value.currency;

    if(this.isEdit){
      console.log("edit")
      business.id = this.selectedBusiness.id;
      this.facade.updateBusiness(business);

    }else{
      console.log("add")
      this.facade.addBusiness(business);

    }
  }


  

}

