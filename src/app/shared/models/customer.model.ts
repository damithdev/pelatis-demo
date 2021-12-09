export class CustomerModel {
    constructor(
        public id: number,
        public name: string,
        public email:string,
        public phone:string,
        public createdDate: Date | null,
        public updatedDate: Date | null,
    ){}
}
