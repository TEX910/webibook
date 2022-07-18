import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkPositionSetterComponent } from './link-position-setter.component';

describe('LinkPositionSetterComponent', () => {
  let component: LinkPositionSetterComponent;
  let fixture: ComponentFixture<LinkPositionSetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkPositionSetterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkPositionSetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
