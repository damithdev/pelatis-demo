import { Routes } from "@angular/router";
import { AuthGuard } from "src/app/auth/auth.guard";
import { OnboardingComponent } from "./onboarding.component";

export const OnboardingRoutes: Routes = [{ path: 'onboard', component: OnboardingComponent,canActivate: [AuthGuard],
}]