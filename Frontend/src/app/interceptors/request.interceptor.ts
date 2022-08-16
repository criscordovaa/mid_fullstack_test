import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from "../services/auth.service";
import {Observable, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {catchError} from "rxjs/operators";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('assets')) {
      return next.handle(req)
    }

    const url = `${environment.api}${req.url}`.replace(/([^:]\/)\/+/g, '$1');
    const token = this.authService.getToken();
    if (token !== null) {
      req = this.addTokenAuth(req, token);
    }

    req = req.clone({url});
    return next.handle(req).pipe(
      catchError((error) => {
        if (error.status === 401 && !req.url.includes('login')) {
          this.authService.logout();
        }
        return throwError(error);
      })
    );
  }

  private addTokenAuth(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

}
