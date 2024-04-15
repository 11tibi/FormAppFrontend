import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowResponseComponent } from './show-response.component';

describe('ShowResponseComponent', () => {
  let component: ShowResponseComponent;
  let fixture: ComponentFixture<ShowResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowResponseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
