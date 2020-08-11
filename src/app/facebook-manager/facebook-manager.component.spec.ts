import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookManagerComponent } from './facebook-manager.component';

describe('FacebookManagerComponent', () => {
  let component: FacebookManagerComponent;
  let fixture: ComponentFixture<FacebookManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacebookManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacebookManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
