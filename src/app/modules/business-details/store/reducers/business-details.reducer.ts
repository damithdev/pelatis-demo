import * as businessActions from '../actions/business-details.action';
import { BusinessModel } from "src/app/shared/models/business.model";
import { Action, createReducer,on } from '@ngrx/store';

export interface BusinessDetailsReducerState {
    entities: {[id: string]:BusinessModel};
    loading: boolean;
    loaded: boolean;
}

export const initialState: BusinessDetailsReducerState = {
    entities: {},
    loading: false,
    loaded: false
}

const businessDetailsReducerInternal = createReducer(
    initialState,
    on(
        businessActions.loadBusinessData,
        businessActions.addBusiness,
        businessActions.updateBusiness, 
        (state, { }) => {
        return {
            ...state,
            loading: true
        };
    }),
    on(businessActions.loadBusinessDataSuccess, (state, { payload }) => {

        const entities: { [id: string]: BusinessModel } = {};

        for(const entity of payload){
            entities[entity.id] = entity;
        }
        return {
            ...state,
            loading: false,
            loaded: true,
            entities:entities
        };
    }),

    on(
        businessActions.addBusinessSuccess,
        businessActions.updateBusinessSuccess,
        (state, {payload}) =>{

            const entities = {
                ...state.entities,
                [payload.id] : payload
            }

            return {
                ...state,
                loading: false,
                loaded: true,
                entities: entities
            }
        }
        )
);

export function businessDetailsReducer(state: BusinessDetailsReducerState | undefined, action: Action){
    return businessDetailsReducerInternal(state,action);
}


export const getBusinessDetailsDataLoading = (state: BusinessDetailsReducerState) => state.loading;
export const getBusinessDetailsDataLoaded = (state: BusinessDetailsReducerState) => state.loaded;
export const getBusinessDetailsData = (state: BusinessDetailsReducerState) => state.entities;