export class UserModel {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public email:string,
        public createdDate: Date | null,
        public updatedDate: Date | null,
        public isDeleted: boolean,
        public defaultBusinessId : number,
        private _token: string,
        private _expiry: Date | null
    ){}

    get token() : string | null{
        if(!this._expiry || new Date() > this._expiry){
            return null;
        }
        return this._token;
    }

    static EMPTY() : UserModel
{
        return new UserModel
    (0,"","","",null,null,false,0,"",null);
    }
}