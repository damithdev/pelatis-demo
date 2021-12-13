import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CustomSelectComponent,
      multi: true
    }
  ]
})
export class CustomSelectComponent implements OnInit ,ControlValueAccessor{

  @Input() label!: string;
  @Input() controlId!: string;
  @Input() selectMenuOptions?: {[key:string]:string};
  value?:string;
  validators?: ValidatorFn[];

  onChange!: (value:string) => void ;
  onTouched!:()=>void;

  constructor() { }

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    // this.onChange = fn;
    this.onChange = (val) => {
      this.value = val;
      fn(val);
    }
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit() {
  }

}
