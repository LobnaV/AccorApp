import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditParamComponent } from './edit-param.component';

describe('EditParamComponent', () => {
  let component: EditParamComponent;
  let fixture: ComponentFixture<EditParamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditParamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditParamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
