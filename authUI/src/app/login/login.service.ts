import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

export interface Login {
  firstName: String;
  lastName: String;
  email: String;
  password: String;
}

@Injectable({
  providedIn: 'root'
})


export class LoginService {

  httpOptions = {
     headers: new HttpHeaders({
       // 'Content-Type':  'application/json',
       'Authorization': 'my-auth-token'
     })
   };

   reqUrl = 'http://localhost:8626/api/login';
   private handleError(error: HttpErrorResponse) {
     if (error.error instanceof ErrorEvent) {
       // A client-side or network error occurred. Handle it accordingly.
       console.error('An error occurred:', error.error.message);
     } else {
       // The backend returned an unsuccessful response code.
       // The response body may contain clues as to what went wrong,
       console.error(
         `Backend returned code ${error.status}, ` +
         `body was: ${error.error}`);
     }
     // return an observable with a user-facing error message
     return throwError(
       'Something bad happened; please try again later.');
   }
   constructor(private http: HttpClient) { }

   login(req) {
     return this.http.post(this.reqUrl, req, this.httpOptions)
     .pipe(
       map((data) => data),
       catchError(this.handleError)
     );
     // console.log(response.subscribe(data =>));

   }

 }
