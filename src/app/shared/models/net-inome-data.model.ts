export class NetIncomeDataModel {
    public year: string;
    public income: number;
    public expense: number;
    public net: number;

    constructor(item: any){
        this.year = item.year || '';
        this.income = item.income || 0;
        this.expense = item.expense || 0;
        this.net = item.net || 0;
    }

    static getEmpty(year:string){
      return new NetIncomeDataModel(
        {
          year: year,
          income: 0,
          expense: 0,
          net: 0
        }
      )
    }

    static compareDate( a:NetIncomeDataModel, b:NetIncomeDataModel ) {
        if ( a.year < b.year ){
          return -1;
        }
        if ( a.year > b.year ){
          return 1;
        }
        return 0;
    }

    fixFloatingPointPrecision(){
      this.income = Math.round((this.income + Number.EPSILON) * 100) / 100;
      this.expense = Math.round((this.expense + Number.EPSILON) * 100) / 100;
      this.net = Math.round((this.net + Number.EPSILON) * 100) / 100;
    }
}
