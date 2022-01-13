import { createAction,props } from "@ngrx/store";
import { BusinessModel } from "src/app/shared/models/business.model";

export const loadBusinessData = createAction('[BUSINESS] LOAD_BUSINESS_DATA');
export const loadBusinessDataSuccess = createAction('[BUSINESS] LOAD_BUSINESS_DATA_SUCCESS',props<{payload:BusinessModel[]}>());


export const addBusiness = createAction('[BUSINESS] ADD_BUSINESS',props<{payload:BusinessModel}>());
export const addBusinessSuccess = createAction('[BUSINESS] ADD_BUSINESS_SUCCESS',props<{payload:BusinessModel}>());


export const updateBusiness = createAction('[BUSINESS] UPDATE_BUSINESS',props<{payload:BusinessModel}>());
export const updateBusinessSuccess = createAction('[BUSINESS] ADD_BUSINESS_SUCCESS',props<{payload:BusinessModel}>());


export const businessDataError = createAction('[BUSINESS] BUSINESS_DATA_ERROR',props<{payload:any}>());


