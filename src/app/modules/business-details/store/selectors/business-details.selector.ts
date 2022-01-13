import { createSelector } from "@ngrx/store";
import * as fromFeature from '../reducers';
import * as fromBusinessDetails from '../reducers/business-details.reducer';

export const getCompleteBusinessDetailsState = createSelector(
    fromFeature.getBusinessDetailsState,
    (state: fromFeature.BusinessDetailsState) => state.businessDetails
)

const getBusinessDataState = createSelector(
    getCompleteBusinessDetailsState,
    fromBusinessDetails.getBusinessDetailsData
);

export const getBusinessData = createSelector(getBusinessDataState, entities => {
    return Object.keys(entities).map(id => entities[id]);
})

export const getLoading = createSelector(
    getCompleteBusinessDetailsState,
    fromBusinessDetails.getBusinessDetailsDataLoading
);

export const getLoaded = createSelector(
    getCompleteBusinessDetailsState,
    fromBusinessDetails.getBusinessDetailsDataLoaded
);