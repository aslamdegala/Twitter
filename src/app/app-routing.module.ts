import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { SearchProfileComponent } from './search-profile/search-profile.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { EditTweetComponent } from './edit-tweet/edit-tweet.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  { path: '', component: LogInComponent },
  { path: 'Register', component: RegisterComponent },
  { path: 'ForgotPassword', component: ForgotPasswordComponent },
  { path: 'Home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'Profile',
    component: UserprofileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'SearchProfile',
    component: SearchProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'ViewProfile',
    component: ViewProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'EditTweet',
    component: EditTweetComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export const routing = [
  LogInComponent,
  RegisterComponent,
  ForgotPasswordComponent,
  UserprofileComponent,
  SearchProfileComponent,
  ViewProfileComponent,
  EditTweetComponent,
];
