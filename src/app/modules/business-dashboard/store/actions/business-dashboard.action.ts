import { createAction,props } from "@ngrx/store";
import { InvoiceDataModel } from "src/app/shared/models/invoice-data.model";

export const loadInvoiceData = createAction('[BUSINESS_DASHBOARD] LOAD_INVOICE_DATA');
export const loadInvoiceDataSuccess = createAction('[BUSINESS_DASHBOARD] LOAD_INVOICE_DATA_SUCCESS'
,props<{payload:InvoiceDataModel[]}>());
export const loadInvoiceDataError = createAction('[BUSINESS_DASHBOARD] LOAD_INVOICE_DATA_ERROR'
,props<{payload:any}>());

