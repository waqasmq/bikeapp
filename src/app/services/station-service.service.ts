import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StationInformation } from '../models/station_information';
import { StationStatus } from '../models/station_status';

@Injectable({
  providedIn: 'root'
})
export class StationService {

  httpOptions = {
    headers: new HttpHeaders({ 'Client-Identifier': 'interview-BikeTest' })
  };
  constructor(private http: HttpClient) { }

  getStationsList(): Observable<StationInformation[]> {
    return this.http.get(environment.apiBaseUrl + environment.stationInfoEndpoint, this.httpOptions).pipe(
      catchError(this.handleError<StationInformation[]>('getStationsList', [])),
      map((data: any) => {
          return (data.data.stations as StationInformation[]); 
        }
      ));  
  }
  
  getStationsStatuses(): Observable<StationStatus[]> {
    return this.http.get(environment.apiBaseUrl + environment.stationStatusEndPoint, this.httpOptions).pipe(
      catchError(this.handleError<StationStatus[]>('getStationsStatuses', [])),
      map((data: any) => {
          return (data.data.stations as StationStatus[]); 
        }
      ));   
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private log(message: string) {
    console.log(`StationService: ${message}`);
  }
}
