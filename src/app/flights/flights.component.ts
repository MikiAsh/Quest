import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../services/data.service';
import { Flight } from '../interfaces/flight';
import { Observable, Subscription, timer } from 'rxjs';
import { mergeMap, map, switchMap } from 'rxjs/operators';

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

  ngOnInit(): void { // TODO: use switchMap instead of nested subscriptions
    this.sub = this.dataService.workerSelected$.pipe(switchMap( () => {
      this.flights$ = this.dataService.getFlights();
      // auto-select first row
      return this.flights$.pipe(map(array => array[0]))
    })).subscribe(firstFlightData => { this.selectFlight(firstFlightData); }
    );
  }

  selectFlight(rowData: Flight): void {
    this.dataService.selectedFlight = rowData;
    this.dataService.resetTimer();
  }

  isSelectedFlight(rowData: Flight): boolean {
    return this.dataService.selectedFlight.num === rowData.num;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
