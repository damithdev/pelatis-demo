import { ChartDataSets, ChartOptions, ChartType } from "chart.js";
import { Label } from "ng2-charts";

export class BarChartModel {
    public barChartOptions: ChartOptions;
    public barChartLabels: Label[];
    public barChartType: ChartType;
    public barChartLegend: boolean;
    public barChartPlugins: [];
    public barChartData: ChartDataSets[];
    constructor(item: any) {
        this.barChartType = 'bar';
        this.barChartOptions = item.barChartOptions;
        this.barChartLabels = item.barChartLabels;
        this.barChartLegend = item.barChartLegend;
        this.barChartPlugins = item.barChartPlugins;
        this.barChartData = item.barChartData;
    }

    static getEmpty() {
        return new BarChartModel({
            barChartOptions: {
                responsive: true,
            },
            barChartLabels: [],
            barChartLegend: false,
            barChartPlugins: [],
            barChartData: [{
                data: [],
                label: 'Y'
            }]
        });
    }
}
