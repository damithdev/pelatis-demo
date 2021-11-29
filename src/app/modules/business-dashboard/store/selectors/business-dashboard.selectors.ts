import { createSelector } from "@ngrx/store";
import * as fromFeature from '../reducers/';
import * as fromBusinessDashboard from '../reducers/business-dashboard.reducer'

export const getCompleteBusinessDashboardState = createSelector(
  fromFeature.getBusinessDashbaordState,
  (state: fromFeature.BusinessDashbaordState) => state.businessDashboard
);

const getCashflowDataState = createSelector(
  getCompleteBusinessDashboardState,
  fromBusinessDashboard.getCashFlowData
);

export const getCashFlowData = createSelector(getCashflowDataState, entity => {
  console.log(entity)
  return entity;
});

const getNetIncomeDataState = createSelector(
  getCompleteBusinessDashboardState,
  fromBusinessDashboard.getNetIncomeData
);

export const getNetIncomeData = createSelector(getNetIncomeDataState, entities => {
  return entities;
});


export const getLoading = createSelector(
  getCompleteBusinessDashboardState,
  fromBusinessDashboard.getInvoiceDataLoading
);

export const getLoaded = createSelector(
  getCompleteBusinessDashboardState,
  fromBusinessDashboard.getInvoiceDataLoaded
);
