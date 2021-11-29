import { Injectable } from "@angular/core";
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { AbstractNotificationService } from "src/app/core/services/abstract-notification.service";
import { InvoiceDataService } from "src/app/shared/data/invoice-data.service";
import {loadInvoiceData,loadInvoiceDataSuccess,loadInvoiceDataError} from "../actions/business-dashboard.action"

@Injectable()
export class BusinessDashboardEffects {

    constructor(
        private invoiceDataService: InvoiceDataService,
        private notificationService: AbstractNotificationService,
        private actions$: Actions
    ) { }

    loadInvoiceData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadInvoiceData),
            switchMap(()=>
                this.invoiceDataService.getInvoiceData().pipe(
                    map(data => loadInvoiceDataSuccess({payload: data})),
                    catchError(error => 
                        of(loadInvoiceDataError({payload:error}))    
                    )
                )    
            )
        )
    );

    businessDashbaordError$ = createEffect(
        () => this.actions$.pipe(
            ofType(loadInvoiceDataError),
            tap(({payload})=>
                this.notificationService.showError('businessDashboard',payload.error.statusText)
            )
        ),
        {dispatch : false}
    );
}