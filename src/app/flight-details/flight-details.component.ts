import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Flight } from '../interfaces/flight';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss']
})
export class FlightDetailsComponent implements OnInit {
  // flights$: Observable<Flight[]>;
  constructor(public dataService: DataService) {}

  ngOnInit(): void {
  }

}
