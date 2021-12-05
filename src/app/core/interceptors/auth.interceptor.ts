import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { param } from "jquery";
import { Observable } from "rxjs";
import { catchError, exhaustMap, take } from "rxjs/operators";
import { AuthService } from "src/app/auth/auth.service";

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        try {
            return this.authService.user.pipe(
                take(1),
                exhaustMap(user => { 
                    if (!user || !user.token) {
                        return next.handle(req);
                    }
                    var value = "Bearer " + user.token;

                    const mReq = req.clone({ params: new HttpParams().set('Authorization', value) });
                    return next.handle(mReq);
                }),
                catchError( error => {
                    console.log(error);
                    return next.handle(req);

                })
            );
        } catch (e) {
            console.log(e);
            return next.handle(req);

        }

    }

}