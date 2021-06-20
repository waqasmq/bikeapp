
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';

import { StationInformation } from '../models/station_information';
import { StationStatus } from '../models/station_status';
import { StationService } from '../services/station-service.service';
import { StationstatusComponent } from '../stationstatus/stationstatus.component';
import { StationMarker } from '../models/map_marker';


@Component({
  selector: 'app-station-viewer',
  templateUrl: './station-viewer.component.html',
  styleUrls: ['./station-viewer.component.scss']
})
export class StationViewerComponent implements OnInit, AfterViewInit {
  constructor(private stationServce: StationService, private dialog: MatDialog) { 
  }
  
  //data table options
  displayedColumns: string[] = [ 'name', 'address', 'capacity'];

  dataSource: MatTableDataSource<StationInformation> = new MatTableDataSource();
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  
  //map options
  markerOptions: google.maps.MarkerOptions = {draggable: false, clickable: true};
  markers: StationMarker[] = new Array();
  center: google.maps.LatLngLiteral = {lat: 59.9139, lng: 10.7522};

  ngOnInit(): void {
    this.stationServce.getStationsList().subscribe((data: StationInformation[]) => {this.addStationsAndMarkers(data)});
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.page.subscribe((pageEvent: PageEvent) => {
      this.addMarkers(pageEvent.pageIndex, pageEvent.pageSize);
    });
  }
  
  addStationsAndMarkers(stations: StationInformation[]) {
    this.dataSource.data = stations;
    this.addMarkers();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator?.firstPage();
    this.addMarkers();
  }
  
  addMarkers(pageIndex: number | undefined = 0, pageSize: number | undefined  = 5) : void {
    this.clearMarkers();
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    const itemsShowed = this.dataSource.filteredData.slice(startIndex, endIndex);
    itemsShowed.forEach(station=> {
      this.markers.push({id: station.station_id, name: station.name, position: {lat: station.lat, lng: station.lon }})
    });
  }
  
  showStationStatus(id: number, name: string) {
    this.stationServce.getStationsStatuses().subscribe((data: StationStatus[]) => {
      const selectedStation = data.find(item=> item.station_id === id);
      const dialogRef = this.dialog.open(StationstatusComponent, {
        data: {
          status: selectedStation,
          name: name
        }
      });
    })
  }
  clearMarkers() {
    this.markers.length = 0;
  }
}
