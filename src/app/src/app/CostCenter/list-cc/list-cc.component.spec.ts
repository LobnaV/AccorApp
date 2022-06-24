import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCcComponent } from './list-cc.component';

describe('ListCcComponent', () => {
  let component: ListCcComponent;
  let fixture: ComponentFixture<ListCcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
