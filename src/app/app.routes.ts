import { Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { AccountReadyComponent } from './account-ready/account-ready.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { LocationSelectorComponent } from './location-selector/location-selector.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ConfirmOtpComponent } from './confirm-otp/confirm-otp.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { PasswordChangedComponent } from './password-changed/password-changed.component';
import { DashboardEventDetailsComponent } from './dashboard-event-details/dashboard-event-details.component';
import { DashboardEventsComponent } from './dashboard-events/dashboard-events.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardProfileComponent } from './dashboard-profile/dashboard-profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  // {path:"home", component:DashboardComponent},
  { path: 'dashboard', component: DashboardComponent, children: [
    { path: 'events', component: DashboardEventsComponent },
    { path: 'profile', component: DashboardProfileComponent },
    { path: 'dashboardhome', component: DashboardHomeComponent },
    {path:"event-details/:id",component:DashboardEventDetailsComponent}
  ]},
  { path: 'events', component: EventsComponent },
  {path:"about", component:AboutUsComponent},
  { path: 'login', component: LoginComponent },
  {path:"verifyemail", component:VerifyEmailComponent},
  {path:"accountready", component:AccountReadyComponent},
  { path: 'emailverification', component: EmailVerificationComponent },
  { path: 'locationselector', component: LocationSelectorComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'confirmotp', component: ConfirmOtpComponent },
  { path: 'resetpassword', component: ResetPasswordComponent },
  { path: 'passwordchanged', component: PasswordChangedComponent },
  {path:"signup", component:SignupComponent},
  { path: 'event-details/:id', component: EventDetailsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },  
  { path: '**', redirectTo: '/home' },
  
];

