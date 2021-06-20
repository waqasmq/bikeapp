import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StationViewerComponent } from './station-viewer.component';

describe('StationViewerComponent', () => {
  let component: StationViewerComponent;
  let fixture: ComponentFixture<StationViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StationViewerComponent ],
      imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
        GoogleMapsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StationViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
