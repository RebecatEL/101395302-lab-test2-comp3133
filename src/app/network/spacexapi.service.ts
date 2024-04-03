import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

import { Mission } from '../models/mission';

@Injectable({
  providedIn: 'root'
})
export class SpacexapiService {

  private REST_API_SERVER = "https://api.spacexdata.com/v3/launches";

  constructor(private httpClient: HttpClient) { }

  public sendGetRequest(){
    return this.httpClient.get<Mission>(this.REST_API_SERVER).pipe(retry(3), catchError(this.handleError));
  }

  public sendGetRequestByLaunchYear(launch_year: number){
    return this.httpClient.get<Mission>(this.REST_API_SERVER + '?launch_year=' + launch_year).pipe(retry(3), catchError(this.handleError));
  }

  public sendGetRequestoDistinctLaunchYears(){
    return this.httpClient.get<Mission[]>(this.REST_API_SERVER)
    .pipe(
      map(data => data.map(item => item.launch_year)),
      map(years => Array.from(new Set(years))),
      retry(3), 
      catchError(this.handleError)
      );
  }

  public sendGetRequestByFlightNumber(flight_number: number){
    return this.httpClient.get<Mission>(this.REST_API_SERVER + '/' + flight_number).pipe(retry(3), catchError(this.handleError));
  }


  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
