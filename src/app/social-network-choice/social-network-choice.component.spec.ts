import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialNetworkChoiceComponent } from './social-network-choice.component';

describe('SocialNetworkChoiceComponent', () => {
  let component: SocialNetworkChoiceComponent;
  let fixture: ComponentFixture<SocialNetworkChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialNetworkChoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialNetworkChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
