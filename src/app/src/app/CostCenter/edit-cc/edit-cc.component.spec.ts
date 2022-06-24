import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCCComponent } from './edit-cc.component';

describe('EditCCComponent', () => {
  let component: EditCCComponent;
  let fixture: ComponentFixture<EditCCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
