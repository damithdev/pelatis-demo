import { Routes } from "@angular/router";
import { AuthGuard } from "src/app/auth/auth.guard";
import { BusinessFormComponent } from "./business-form/business-form.component";
import { BusinessListComponent } from "./business-list/business-list.component";

export const BusinessDetailsRoutes: Routes = [
    { path: 'businesses', component: BusinessListComponent,canActivate: [AuthGuard]},
    { path: 'business', component: BusinessFormComponent,canActivate: [AuthGuard]},
]