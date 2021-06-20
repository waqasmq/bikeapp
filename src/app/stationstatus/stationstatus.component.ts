import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { StationStatus } from '../models/station_status';

@Component({
  selector: 'app-stationstatus',
  templateUrl: './stationstatus.component.html',
  styleUrls: ['./stationstatus.component.scss']
})
export class StationstatusComponent implements OnInit {
  stationName!: string;
  availableBikes!: number;
  availableDocks!: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.stationName = data.name;
    this.availableBikes = data.status.num_bikes_available;
    this.availableDocks = data.status.num_docks_available;
  }


  ngOnInit(): void {
  }

}
