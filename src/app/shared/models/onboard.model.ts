import { DynamicFormFieldModel } from "../components/dynamic-form-field/dynamic-form-field.model";
import { BusinessModel } from "./business.model";
import { UserModel } from "./user.model";

export class OnboardModel {
    constructor(
        public step:number,
        public dynamicFormFields: DynamicFormFieldModel[],
        public user:UserModel,
        public business:BusinessModel | null
        ){};

}
