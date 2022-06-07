import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonToCsvComponent } from './json-to-csv.component';

describe('JsonToCsvComponent', () => {
  let component: JsonToCsvComponent;
  let fixture: ComponentFixture<JsonToCsvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsonToCsvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonToCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
