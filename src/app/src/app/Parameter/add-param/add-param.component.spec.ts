import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParamComponent } from './add-param.component';

describe('AddParamComponent', () => {
  let component: AddParamComponent;
  let fixture: ComponentFixture<AddParamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddParamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddParamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
