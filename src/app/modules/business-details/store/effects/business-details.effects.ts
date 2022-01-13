import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { AbstractNotificationService } from "src/app/core/services/abstract-notification.service";
import { BusinessDataService } from "src/app/shared/data/business-data.service";
import * as businessDetailActions from '../actions/business-details.action'

@Injectable()
export class BusinessDetailsEffects{
    constructor(
        private service: BusinessDataService, 
        private notificationService: AbstractNotificationService,
        private actions$: Actions
    ) {}

    loadBusinessData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(businessDetailActions.loadBusinessData),
            switchMap(() =>
                this.service.getBusinesses().pipe(
                    map(data => businessDetailActions.loadBusinessDataSuccess({payload: data})),
                    catchError(error => of(businessDetailActions.businessDataError({payload : error})))
                )
            )
        )
    );

    addBusiness$ = createEffect(() =>
        this.actions$.pipe(
            ofType(businessDetailActions.addBusiness),
            switchMap(({payload}) => 
                this.service.addBusiness(payload.companyName,payload.typeOfBusiness,payload.country,payload.currency)
                .pipe(
                    map(data => businessDetailActions.addBusinessSuccess({payload : data})),
                    catchError(error => of(businessDetailActions.businessDataError({payload:error})))
                )
            )
        )
    );

    updateBusiness$ = createEffect(() =>
    this.actions$.pipe(
        ofType(businessDetailActions.updateBusiness),
        switchMap(({payload}) => 
            this.service.editBusiness(payload.id,payload.companyName,payload.typeOfBusiness,payload.country,payload.currency)
            .pipe(
                map(data => businessDetailActions.updateBusinessSuccess({payload : data})),
                catchError(error => of(businessDetailActions.businessDataError({payload:error})))
            )
        )
    )
);


    
}