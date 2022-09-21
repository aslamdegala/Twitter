import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  result: any;
  details: any;
  UserName = sessionStorage.getItem('UserName');
  storeName: any;
  isLoggedIn = this.UserName == null || this.UserName == '' ? false : true;

  constructor(private http: HttpClient, private router: Router) {}
  Register(user: User) {
    console.warn(user);
    this.result = this.http.post(
      'https://comtweetapp20220921080350.azurewebsites.net/api/v1.0/Tweets/register',
      user
    );
    return this.result;
  }
  Authenticate(id: any, password: any) {
    console.log(id, password);
    return this.http.get<any>(
      'https://comtweetapp20220921080350.azurewebsites.net/api/v1.0/Tweets/Login?username=' +
        id +
        '&password=' +
        password
    );
  }
  LoginAgent(res: any) {
    sessionStorage.setItem('UserName', res.userName);

    sessionStorage.setItem('FirstName', res.firstName);
    sessionStorage.setItem('LastName', res.lastName);
    sessionStorage.setItem('UserEmail', res.lastName);
    sessionStorage.setItem('ContactNO', res.contactNo);

    this.isLoggedIn = true;
    this.router.navigate(['/Home']);
  }
  Logout() {
    sessionStorage.clear();

    sessionStorage.removeItem('UserName');

    this.isLoggedIn = false;
    this.router.navigate(['']);
  }
  isloggedInCheack() {
    return this.isLoggedIn;
  }

  ForgotPassword(username: any, password: any) {
    return this.http.get<any>(
      'https://comtweetapp20220921080350.azurewebsites.net/api/v1.0/Tweets/' +
        username +
        '/forgot?password=' +
        password
    );
  }
  GetProfile(Data: any) {
    console.log(Data);
    return this.http.get<any>(
      'https://comtweetapp20220921080350.azurewebsites.net/api/v1.0/Tweets/Search/username?username=' +
        Data
    );
  }

  GetAllProfiles() {
    return this.http.get<any>(
      'https://comtweetapp20220921080350.azurewebsites.net/api/v1.0/Tweets/users/AllUser'
    );
  }
  StroreName(name: string) {
    this.storeName = name;
  }
  Restore() {
    return this.storeName;
  }
}
