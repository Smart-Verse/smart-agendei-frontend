import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest } from "@angular/common/http";
import { catchError, Observable, tap, throwError } from "rxjs";
import { Router } from "@angular/router";
import { inject } from "@angular/core";
import { environment } from "../../../environments/environment";
import {CookiesService} from "../../shared/services/cookies/cookies.service";
import {EnumCookie} from "../../shared/services/cookies/cookie.enum";


export function authInterceptor(originalRequest: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const cookiesService = inject(CookiesService);
    const router = inject(Router);
    //const toastService = inject(ToastService, { optional: true });

    let request: HttpRequest<unknown>;

    let headers = new HttpHeaders();
    if(cookiesService.get(EnumCookie.AUTHORIZATION) !== null){
      headers = headers.set('Authorization', "Bearer " + cookiesService.get(EnumCookie.AUTHORIZATION));
    }



    if(urlPermission(originalRequest)){
      request = originalRequest.clone({
        url: `${originalRequest.url}`,
      });
    } else {
      request = originalRequest.clone({
        headers: headers,
        url: `${environment.apiUrl}/${originalRequest.url}`,
      });
    }

    return next(request).pipe(
        catchError((error: HttpErrorResponse) => {

            if(error.status === 401 || error.status === 0){
              cookiesService.delete(EnumCookie.AUTHORIZATION);
              router.navigate(['login']);
            }

            return throwError(() => {
            });
          })
    );
}
export function urlPermission(request: HttpRequest<unknown>): boolean {
  return request.url.indexOf("amazon") > -1;
}
