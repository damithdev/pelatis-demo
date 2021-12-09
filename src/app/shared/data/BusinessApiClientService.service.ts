import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AuthResponse } from 'src/app/auth/auth.service';
import { BusinessModel } from '../models/business.model';

@Injectable({
  providedIn: 'root'
})
export class BusinessApiClientServiceService {

  constructor(private http:HttpClient) { }

  getBusinessData() {

    return this.http.get<BusinessModel[]>(
      'http://localhost:63928/api/Business/GetBusinessesForUser'
    );

  }

}
