import { on, createReducer, Action } from '@ngrx/store';
import { BarChartModel } from 'src/app/shared/models/bar-chart.model.ts';
import { InvoiceDataModel } from "src/app/shared/models/invoice-data.model";
import { MenuItem } from "src/app/shared/models/menu-item.model";
import { NetIncomeDataModel } from 'src/app/shared/models/net-inome-data.model';
import { DateTimeUtility } from 'src/app/shared/utility/date-util';
import * as businessDashboardActions from "../actions"


export interface BusinessDashboarReducerdState {
    cashFlowData: BarChartModel;
    netIncomeData: {"current":NetIncomeDataModel,"previous":NetIncomeDataModel};
    loading: boolean;
    loaded: boolean;
}

export const initialState: BusinessDashboarReducerdState = {
    cashFlowData: BarChartModel.getEmpty(),
    netIncomeData: {"current":NetIncomeDataModel.getEmpty(""),"previous":NetIncomeDataModel.getEmpty("")},
    loading: false,
    loaded: false
}

const businessDashboardReducerInternal = createReducer(
    initialState,
    on(businessDashboardActions.loadInvoiceData, (state, { }) => {
        return {
            ...state,
            loading: true
        };
    }),
    on(businessDashboardActions.loadInvoiceDataSuccess, (state, { payload }) => {
        var values: InvoiceDataModel[] = payload;
        let barChartData = BarChartModel.getEmpty();
        let barChartDataPoints: number[] = [];
        let barChartLabels: string[] = [];
        var arrayForSort = [...values]

        let current = new Date();
        let lastYear = new Date();
        lastYear.setFullYear(current.getFullYear()-1)
        var currentYearIncome = NetIncomeDataModel.getEmpty(current.getFullYear().toString());
        var previousYearIncome = NetIncomeDataModel.getEmpty(lastYear.getFullYear().toString());

        arrayForSort.sort(InvoiceDataModel.compareDate)
        arrayForSort.forEach(item => {
            let date = new Date(item.date);
            let MMYY = DateTimeUtility.getMMYYDate(date);
            // console.log(date);
            barChartLabels.push(MMYY?MMYY:"");
            barChartDataPoints.push(item.expenses);

            if(date.getFullYear() === current.getFullYear()){
                currentYearIncome.expense += item.expenses;
                currentYearIncome.income += item.invoiced;
            }else if(date.getFullYear() === lastYear.getFullYear()){
                previousYearIncome.expense += item.expenses;
                previousYearIncome.income += item.invoiced;
            }
        })
        barChartData.barChartLegend = true;
        barChartData.barChartData = [{
            data: [...barChartDataPoints],
            label: 'Expenses'
        }]
        barChartData.barChartLabels = [...barChartLabels];


        currentYearIncome.net = currentYearIncome.income - currentYearIncome.expense;
        previousYearIncome.net = previousYearIncome.income - previousYearIncome.expense;
        
        currentYearIncome.fixFloatingPointPrecision();
        previousYearIncome.fixFloatingPointPrecision();

        return {
            ...state,
            cashFlowData: barChartData,
            netIncomeData: {
                "current":currentYearIncome,
                "previous":previousYearIncome
            },
            loaded: true,
            loading: false
        }
    }),

);

export function businessDashboardReducer(state: BusinessDashboarReducerdState | undefined, action: Action) {
    return businessDashboardReducerInternal(state, action);
}

export const getCashFlowData = (state: BusinessDashboarReducerdState) => state.cashFlowData;
export const getNetIncomeData = (state: BusinessDashboarReducerdState) => state.netIncomeData;
export const getInvoiceDataLoaded = (state: BusinessDashboarReducerdState) => state.loaded;
export const getInvoiceDataLoading = (state: BusinessDashboarReducerdState) => state.loading;