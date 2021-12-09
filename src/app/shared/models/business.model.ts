export class BusinessModel {
    constructor(
        public id: number,
        public companyName: string,
        public typeOfBusiness:string,
        public country:string,
        public currency:string,
        public createdDate: Date | null,
        public updatedDate: Date | null,
    ){}
}
