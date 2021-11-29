export class InvoiceDataModel {
    public id: number;
    public date: string;
    public invoiced: number;
    public expenses: number;
    public currency: string;

    constructor(item: any){
        this.id = item.id || 0;
        this.date = item.date || '';
        this.invoiced = item.invoiced || 0;
        this.expenses = item.expenses || 0;
        this.currency = item.currency || '';
    }

    static compareDate( a:InvoiceDataModel, b:InvoiceDataModel ) {
        if ( a.date < b.date ){
          return -1;
        }
        if ( a.date > b.date ){
          return 1;
        }
        return 0;
    }
}
