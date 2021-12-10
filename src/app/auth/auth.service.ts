import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { ValidationService } from '@shared/utility';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserModel } from '../shared/models/user.model';
import { Constants } from '../shared/utility/Constants';
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
  defaultBusinessId: number,
  token: string,
  expiry: string

}

@Injectable({ providedIn: 'root' })
export class AuthService {

  _user$ = new BehaviorSubject<UserModel>(UserModel.EMPTY());
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {

  }

  get user() {
    return this._user$.asObservable();
  }



  signUp(email: string, password: string) {
    return this.http.post<AuthResponse>(
      Constants.API_ENDPOINT+'Accounts/register', {
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
      Constants.API_ENDPOINT+'Accounts/login', {
      email: email,
      password: password
    }
    ).pipe(
      tap(data => {
        this.handleAuthData(data);
      })
    );
  }


  fetch() {
    console.log("fetch")
    return this.http.get<AuthResponse>(
      Constants.API_ENDPOINT+'AppUsers/get'
    ).pipe(
      tap(data => {
        this.updateUserData(data);
      })
    );
  }


  handleAuthData(data: AuthResponse) {
    console.warn("handle auth data")
    console.warn(data)
    const updated = data.updatedDate ? new Date(data.updatedDate) : null;
    const user = new UserModel(data.id, data.firstName, data.lastName, data.email, new Date(data.createdDate), updated, data.isDeleted, data.defaultBusinessId, data.token, new Date(data.expiry));
    this._user$.next(user);
    localStorage.setItem("USER_DATA", JSON.stringify(user))
    const expirationDuration =
      new Date(data.expiry).getTime() -
      new Date().getTime();
    this.autoLogout(expirationDuration);
    this.autoLogin();
  }

  logout() {
    console.log("logout")
    this._user$.next(UserModel.EMPTY());
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
        defaultBusinessId: number,
        _token: string,
        _expiry: string
      } = JSON.parse(value);
      if (!data) {
        return;
      }
      const updated = data.updatedDate ? new Date(data.updatedDate) : null;
      const laodeduser = new UserModel(data.id, data.firstName, data.lastName, data.email, new Date(data.createdDate), updated, data.isDeleted, data.defaultBusinessId, data._token, new Date(data._expiry));


      this._user$.next(laodeduser);

      if (laodeduser.token) {
        console.log("auto login")

        if (laodeduser.firstName && laodeduser.lastName && laodeduser.defaultBusinessId > 0) {
          console.log("auto home")

          this.router.navigate(['/home']);
        } else {
          console.log(laodeduser)
          console.log("auto onboard")

          this.router.navigate(['/onboard']);
        }

        const expirationDuration =
          new Date(data._expiry).getTime() -
          new Date().getTime();
        this.autoLogout(expirationDuration);
      }
    }
  }

  autoLogout(expirationDuration: number) {
    console.log(expirationDuration)
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  updateUserData(response: AuthResponse) {
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
        defaultBusinessId: number,
        _token: string,
        _expiry: string
      } = JSON.parse(value);
      if (!data) {
        return;
      }
      const updated = data.updatedDate ? new Date(data.updatedDate) : null;
      const loadeduser = new UserModel(data.id, data.firstName, data.lastName, data.email, new Date(data.createdDate), updated, data.isDeleted, data.defaultBusinessId, data._token, new Date(data._expiry));

      loadeduser.updatedDate = response.updatedDate ? new Date(response.updatedDate) : null;
      loadeduser.defaultBusinessId = response.defaultBusinessId;
      loadeduser.email = response.email;
      loadeduser.firstName = response.firstName;
      loadeduser.lastName = response.lastName;
      loadeduser.id = response.id;

      this._user$.next(loadeduser);
      localStorage.setItem("USER_DATA", JSON.stringify(loadeduser))
      this.autoLogin();
    }
  }
}
