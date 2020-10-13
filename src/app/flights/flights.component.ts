import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../services/data.service';
import { Flight } from '../interfaces/flight';
import { Observable, Subscription, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent implements OnInit, OnDestroy {
  flights$: Observable<Flight[]>;
  sub: Subscription;
  displayedColumns: string[] = ['flightNumber', 'origin', 'originDate', 'destination', 'destinationDate'];

  constructor(public dataService: DataService) {}

  ngOnInit(): void {
    const minute = 1000 * 60;
    this.sub = timer(0, minute).pipe(mergeMap(() =>  this.dataService.workerSelected$ ))
    .subscribe(() => {
      this.flights$ = this.dataService.getFlights();
    });
  }

  selectFlight(rowData: Flight): void {
    this.dataService.selectedFlight = rowData;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
