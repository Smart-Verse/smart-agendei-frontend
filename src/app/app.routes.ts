import { Routes } from '@angular/router';
import {LoginComponent} from "./security/login/login.component";
import {publicGuard} from "./security/guards/public.guard";
import {SignupComponent} from "./security/signup/signup.component";
import {HomeComponent} from "./pages/home/home.component";
import {privateGuard} from "./security/guards/private.guard";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {ServicesComponent} from "./pages/services/services.component";
import {PersonComponent} from "./pages/person/person.component";
import {SchedulerComponent} from "./pages/scheduler/scheduler.component";
import {ConfigurationComponent} from "./pages/configuration/configuration.component";
import {RegisterComponent} from "./pages/register/register.component";

export const routes: Routes = [

  { path: "login", component: LoginComponent, pathMatch: "full", canActivate: [publicGuard] },
  { path: "singup", component: SignupComponent, pathMatch: "full", canActivate: [publicGuard] },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [privateGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'register/:hash', component: RegisterComponent },
      { path: 'services', component: ServicesComponent },
      { path: 'person', component: PersonComponent },
      { path: 'scheduler', component: SchedulerComponent },
      { path: 'configuration', component: ConfigurationComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];
