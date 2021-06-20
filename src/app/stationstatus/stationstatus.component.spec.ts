import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';

import { StationstatusComponent } from './stationstatus.component';

describe('StationstatusComponent', () => {
  let component: StationstatusComponent;
  let fixture: ComponentFixture<StationstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StationstatusComponent ],
      imports: [MatDialogModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StationstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
