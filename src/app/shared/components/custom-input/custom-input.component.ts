import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DynamicFormFieldModel } from '../dynamic-form-field/dynamic-form-field.model';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CustomInputComponent,
      multi: true
    }
  ]
})
export class CustomInputComponent implements OnInit ,ControlValueAccessor{

  @Input() label!: string;
  @Input() controlId!: string;
  value!:string;

  onChange!: (value:string) => void;
  onTouched!:()=>void;
  constructor() { }

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
   }

  registerOnTouched(fn: any): void { 
    this.onTouched = fn;
   }


  ngOnInit() {
  }

}
