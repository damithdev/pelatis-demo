import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { param } from "jquery";
import { Observable, of, throwError } from "rxjs";
import { catchError, exhaustMap, map, retry, take } from "rxjs/operators";
import { AuthService } from "src/app/auth/auth.service";

@Injectable({ providedIn: 'root' })
export class CustomHttpInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let handled: boolean = false;

        
        return this.handleAuthHeader(req).pipe(exhaustMap(
            req => {
                return next.handle(req).pipe(
                    retry(0),
                    catchError((returnedError) => {
                        console.log(returnedError)
                        let errorMessage = null;
        
                        if (returnedError.error instanceof ErrorEvent) {
                            let error: ErrorEvent = returnedError;
                            errorMessage = `Error: ${error.message}`;
                        } else if (returnedError instanceof HttpErrorResponse) {
                            let error: HttpErrorResponse = returnedError;
                            errorMessage = "Error Status " + error.status + ":" + error.statusText;
                            handled = this.handleServerSideError(error);
                        }
        
                        console.error(errorMessage ? errorMessage : returnedError);
        
                        if (!handled) {
                            if (errorMessage) {
                                return throwError(errorMessage);
                            } else {
                                return throwError("Unexpected problem occurred");
                            }
                        } else {
                            return of(returnedError);
                        }
                    })
                ); 
            }
        ));




    }

    handleAuthHeader(req: HttpRequest<any>): Observable<HttpRequest<any>> {
        try {
            return this.authService.user.pipe(
                take(1),
                exhaustMap(user => {
                    if (!user || !user.token) {
                        return of(req)
                    }
                    var value = `Bearer ${user.token}`

                    const mReq = req.clone({ headers: new HttpHeaders().set('Authorization', value) });
                    return of(mReq);
                }),
                catchError(error => {
                    return of(req);
                })
            );
        } catch (e) {
            console.log(e);
            return of(req);
        }

    }

    private handleServerSideError(error: HttpErrorResponse): boolean {
        let handled: boolean = false;

        switch (error.status) {
            case 401:
                //   this.routeMessageService.message = "Please login again.";
                this.authService.logout();
                handled = true;
                break;
            case 403:
                //   this.routeMessageService.message = "Please login again.";
                this.authService.logout();
                handled = true;
                break;
        }

        return handled;
    }

}