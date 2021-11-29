import { DatePipe } from "@angular/common";

const datepipe: DatePipe = new DatePipe('en-US')

export class DateTimeUtility{

    static getMMYYDate(date:Date) : string | null{
        let formattedDate = datepipe.transform(date, 'MM/YY')
        return formattedDate;
    }

}