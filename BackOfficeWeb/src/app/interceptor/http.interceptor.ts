import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private toastr: ToastrService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let clonedRequest :any ={}
    if (!req.url.includes('login')) {
       clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`, 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': `*`,
          'Access-Control-Allow-Methods': `GET, POST, PATCH, PUT, DELETE, OPTIONS`,
          'Access-Control-Allow-Headers' : `Content-Type`
        },
      });
    }
    else{
       clonedRequest = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': `*`,
          'Access-Control-Allow-Methods': `GET, POST, PATCH, PUT, DELETE, OPTIONS`,
          'Access-Control-Allow-Headers' : `Content-Type`
        },
      });
    }
 
    return next.handle(clonedRequest).pipe(
      catchError((error :any) => {
        this.handleError(error);
        throw error;
      })
    );
  }

  /**
   * Handle HTTP errors globally.
   */
  private handleError(error: any): void {
    if (error.status === 401) {
      this.toastr.error('Unauthorized! Please log in again.', 'Authentication Error');
    } else if (error.status === 403) {
      this.toastr.warning('You do not have permission to access this resource.', 'Access Denied');
    } else if (error.status === 404) {
      this.toastr.error('The requested resource was not found.', 'Not Found');
    } else if (error.status >= 500) {
      this.toastr.error('An unexpected server error occurred.', 'Server Error');
    } else {
      this.toastr.error('An unknown error occurred.', 'Error');
    }
  }
}
