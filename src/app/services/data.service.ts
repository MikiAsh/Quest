import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Worker } from '../interfaces/worker';
import { Flight } from '../interfaces/flight';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseUrl: string;
  private _selectedWorker: number;
  private _selectedFlight: Flight;
  workerSelected$ = new Subject();

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  public set selectedWorker(v: number) {
    this._selectedWorker = v;
    this.workerSelected$.next();
  }

  public get selectedWorker(): number {
    return this._selectedWorker;
  }

  public set selectedFlight(v: Flight) {
    this._selectedFlight = v;
  }

  public get selectedFlight(): Flight {
    return this._selectedFlight;
  }

  getWorkers(): Observable<Worker[]> {
    const route = 'workers';
    const url = new URL(route, this.baseUrl).toString();
    return this.http.get<Worker[]>(url);
  }

  getFlights(): Observable<Flight[]> {
    if (!this.selectedWorker) return;

    const route = `workers/${this.selectedWorker}`;
    const url = new URL(route, this.baseUrl).toString();
    return this.http.get<Flight[]>(url);
  }
}
