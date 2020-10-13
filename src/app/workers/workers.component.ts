import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Worker } from '../interfaces/worker';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.scss'],
})
export class WorkersComponent implements OnInit {
  workers$: Observable<Worker[]>;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.workers$ = this.dataService.getWorkers();
  }

  isSelectedWorker(workerId, first): boolean {
    if (!this.dataService.selectedWorker && first) {
      this.selectWorker(workerId);
    }
    return this.dataService.selectedWorker === workerId;
  }

  selectWorker(id: number): void {
    this.dataService.selectedWorker = id;
  }
}
