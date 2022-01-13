import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import { businessDashboardReducer } from "src/app/modules/business-dashboard/store/reducers/business-dashboard.reducer";
import { businessDetailsReducer, BusinessDetailsReducerState } from "./business-details.reducer";

export interface BusinessDetailsState{
    businessDetails: BusinessDetailsReducerState;
}

export const reducers: ActionReducerMap<BusinessDetailsState> = {
    businessDetails: businessDetailsReducer
}

export const getBusinessDetailsState = createFeatureSelector<BusinessDetailsState>('BUSINESS');