import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScopeMenuComponent } from './scope-menu.component';

describe('ScopeMenuComponent', () => {
  let component: ScopeMenuComponent;
  let fixture: ComponentFixture<ScopeMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScopeMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScopeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
