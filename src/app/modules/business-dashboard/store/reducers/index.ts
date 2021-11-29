import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { businessDashboardReducer, BusinessDashboarReducerdState } from './business-dashboard.reducer'

export interface BusinessDashbaordState {
    businessDashboard: BusinessDashboarReducerdState;
}

export const reducers: ActionReducerMap<BusinessDashbaordState> = {
    businessDashboard: businessDashboardReducer
}

export const getBusinessDashbaordState = createFeatureSelector<BusinessDashbaordState>('businessDashboard');