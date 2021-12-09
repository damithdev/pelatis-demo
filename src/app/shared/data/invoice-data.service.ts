import { Injectable } from '@angular/core';
import { data } from 'jquery';
import { Observable } from 'rxjs';
import { InvoiceDataModel } from '../models/invoice-data.model';
import { HttpWrapperService } from './http-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceDataService {

  constructor(private http: HttpWrapperService) { }

  getInvoiceData():Observable<InvoiceDataModel[]>{
    return this.http.get<any>('assets/data/monthly_invoice_data.json');
  }


}
