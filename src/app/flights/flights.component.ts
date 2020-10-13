import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../services/data.service';
import { Flight } from '../interfaces/flight';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent implements OnInit, OnDestroy {
  flights$: Observable<Flight[]>;
  sub: Subscription;
  displayedColumns: string[] = ['flightNumber', 'origin', 'originDate', 'destination', 'destinationDate'];
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.sub = this.dataService.workerSelected$.subscribe(workerId => {
      this.flights$ = this.dataService.getFlights();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
