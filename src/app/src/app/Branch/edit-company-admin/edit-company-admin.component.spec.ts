import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCompanyAdminComponent } from './edit-company-admin.component';

describe('EditCompanyAdminComponent', () => {
  let component: EditCompanyAdminComponent;
  let fixture: ComponentFixture<EditCompanyAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCompanyAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCompanyAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
