import { Routes } from "@angular/router";
import { AuthGuard } from "src/app/auth/auth.guard";
import { BusinessDetailsComponent } from "./business-details.component";
import { BusinessFormComponent } from "./business-form/business-form.component";
import { BusinessListComponent } from "./business-list/business-list.component";



export const BusinessDetailsRoutes: Routes = [
    { path: 'business/:action', component: BusinessDetailsComponent,canActivate: [AuthGuard]},
]