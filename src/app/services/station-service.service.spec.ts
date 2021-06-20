import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { StationService } from './station-service.service';

describe('StationService', () => {
  let service: StationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientModule],
        providers: [StationService]
    });
    service = TestBed.get(StationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('#getStationsList should return value from observable',
    (done: DoneFn) => {
    service.getStationsList().subscribe(value => {
      expect(value.length).toBe(250);
      done();
    });
  });
  it('#getStationsStatuses should return value from observable',
    (done: DoneFn) => {
    service.getStationsStatuses().subscribe(value => {
      expect(value.length).toBe(250);
      done();
    });
  });
});
