import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Worker } from '../interfaces/worker';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseUrl: string;
  private _selectedWorker: number;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  public set selectedWorker(v: number) {
    this._selectedWorker = v;
  }

  public get selectedWorker(): number {
    return this._selectedWorker;
  }

  getWorkers(): Observable<Worker[]> {
    const route = 'workers';
    const url = new URL(route, this.baseUrl).toString();
    return this.http.get<Worker[]>(url);
  }
}
