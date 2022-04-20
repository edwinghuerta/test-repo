import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerReceiptsComponent } from './partner-receipts.component';

describe('PartnerReceiptsComponent', () => {
  let component: PartnerReceiptsComponent;
  let fixture: ComponentFixture<PartnerReceiptsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerReceiptsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerReceiptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
