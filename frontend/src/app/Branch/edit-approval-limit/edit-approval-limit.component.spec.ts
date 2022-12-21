import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditApprovalLimitComponent } from './edit-approval-limit.component';

describe('EditApprovalLimitComponent', () => {
  let component: EditApprovalLimitComponent;
  let fixture: ComponentFixture<EditApprovalLimitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditApprovalLimitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditApprovalLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
