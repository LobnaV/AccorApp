import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCsvToJsonComponent } from './upload-csv-to-json.component';

describe('UploadCsvToJsonComponent', () => {
  let component: UploadCsvToJsonComponent;
  let fixture: ComponentFixture<UploadCsvToJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadCsvToJsonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadCsvToJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
