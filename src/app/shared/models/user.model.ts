export class User {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public email:string,
        public createdDate: Date | null,
        public updatedDate: Date | null,
        public isDeleted: boolean,
        private _token: string,
        private _expiry: Date | null
    ){}

    get token() : string | null{
        if(!this._expiry || new Date() > this._expiry){
            return null;
        }
        return this._token;
    }

    static EMPTY() : User{
        return new User(0,"","","",null,null,false,"",null);
    }
}