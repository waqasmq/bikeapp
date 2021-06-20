import { ThrowStmt } from '@angular/compiler';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, GoogleMapsModule, MapInfoWindow, MapMarker } from '@angular/google-maps';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';

import { StationInformation } from '../models/station_information';
import { StationStatus } from '../models/station_status';
import { StationService } from '../services/station-service.service';
import { StationstatusComponent } from '../stationstatus/stationstatus.component';


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
  markers: [{ id: number, name: string; position: google.maps.LatLngLiteral; }] = [{id : 0, name: '', position: {lat: 0, lng:0}}];
  center: google.maps.LatLngLiteral = {lat: 59.9139, lng: 10.7522};

  @ViewChild(MapInfoWindow, { static: false })
  infoWindow!: MapInfoWindow;

  ngOnInit(): void {
    this.stationServce.getStationsList().subscribe((data: StationInformation[]) => this.addStationsAndMarkers(data));
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.page.subscribe((pageEvent: PageEvent) => {
      const visibleItems = this.getVisibleSations(pageEvent.pageIndex, pageEvent.pageSize);
      this.updateMarkersOnMap(visibleItems);
    });
  }
  // get visible station info on page.
  getVisibleSations(pageIndex: number, pageSize: number): StationInformation[] {
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    const itemsShowed = this.dataSource.filteredData.slice(startIndex, endIndex);
    return itemsShowed;
  }

  addStationsAndMarkers(stations: StationInformation[]) {
    this.clearMarkers();
    this.dataSource.data = stations;
    const visibleStations = this.getVisibleSations(0, 5);
    this.addMarkersOnMap(visibleStations);
  }

  addMarkersOnMap(stations : StationInformation[]) {

    stations.forEach(station=> {
      this.markers.push({id: station.station_id, name: station.name, position: {lat: station.lat, lng: station.lon }})
    });
  }
  updateMarkersOnMap(stations: StationInformation[]) {
    this.clearMarkers();
    this.addMarkersOnMap(stations);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(filterValue.trim() == "")
    filterValue.trim() == "" ? this.addStationsAndMarkers(this.dataSource.filteredData) : this.updateMarkersOnMap(this.dataSource.filteredData); 
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
    this.markers.length = 1;
  }
}
