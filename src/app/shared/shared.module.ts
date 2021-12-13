import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationToggleComponent } from './components/navigation-toggle/navigation-toggle.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormFieldComponent } from './components/dynamic-form-field/dynamic-form-field.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { CustomSelectComponent } from './components/custom-select/custom-select.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavigationComponent,
    NavigationToggleComponent,
    FooterComponent,
    LoadingSpinnerComponent,
    DynamicFormFieldComponent,
    CustomInputComponent,
    CustomSelectComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  // providers: [
  //   NavigationMenuService,
  // ],
  exports : [
    //Components
    NavigationComponent,
    NavigationToggleComponent,
    FooterComponent,
    LoadingSpinnerComponent,
    DynamicFormFieldComponent,
    CustomInputComponent,
    CustomSelectComponent,

    //Modules
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
