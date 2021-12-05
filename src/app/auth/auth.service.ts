import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { ValidationService } from '@shared/utility';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../shared/models/user.model';
// import { JwtHelperService } from '@auth0/angular-jwt';
// const JwtHelper = new JwtHelperService();

export interface AuthResponse {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  createdDate: string,
  updatedDate: string,
  isDeleted: boolean,
  token: string,
  expiry: string

}

@Injectable({ providedIn: 'root' })
export class AuthService {

  _user$ = new BehaviorSubject<User>(User.EMPTY());
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {

  }

  get user() {
    return this._user$.asObservable();
  }



  signUp(email: string, password: string) {
    return this.http.post<AuthResponse>(
      'http://localhost:63928/api/Accounts/register', {
      email: email,
      password: password
    }
    ).pipe(
      tap(data => {
        this.handleAuthData(data);
      })
    );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponse>(
      'http://localhost:63928/api/Accounts/login', {
      email: email,
      password: password
    }
    ).pipe(
      tap(data => {
        this.handleAuthData(data);
      })
    );
  }


  handleAuthData(data: AuthResponse) {
    const updated = data.updatedDate ? new Date(data.updatedDate) : null;
    const user = new User(data.id, data.firstName, data.lastName, data.email, new Date(data.createdDate), updated, data.isDeleted, data.token, new Date(data.expiry));
    this._user$.next(user);
    localStorage.setItem("USER_DATA", JSON.stringify(user))
    console.log("here")
    this.router.navigate(['/home']);
    const expirationDuration =
      new Date(data.expiry).getTime() -
      new Date().getTime();
    this.autoLogout(expirationDuration);
  }

  logout() {
    console.log("logout")
    this._user$.next(User.EMPTY());
    localStorage.removeItem("USER_DATA");
    this.router.navigate(['/auth'])
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogin() {
    const value = localStorage.getItem("USER_DATA");
    if (value != null) {
      const data: {
        id: number,
        firstName: string,
        lastName: string,
        email: string,
        createdDate: string,
        updatedDate: string,
        isDeleted: boolean,
        _token: string,
        _expiry: string
      } = JSON.parse(value);
      if (!data) {
        return;
      }
      const updated = data.updatedDate ? new Date(data.updatedDate) : null;
      const laodeduser = new User(data.id, data.firstName, data.lastName, data.email, new Date(data.createdDate), updated, data.isDeleted, data._token, new Date(data._expiry));


      this._user$.next(laodeduser);
      if (laodeduser.token) {
        console.log("auto login")

        this.router.navigate(['/home']);
        const expirationDuration =
          new Date(data._expiry).getTime() -
          new Date().getTime();
        this.autoLogout(expirationDuration);
      }
    }
  }

  autoLogout(expirationDuration: number) {
    console.log(expirationDuration)
    // this.tokenExpirationTimer = setTimeout(() => {
    //   this.logout();
    // }, expirationDuration);
  }
}
