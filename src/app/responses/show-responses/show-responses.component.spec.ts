import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowResponsesComponent } from './show-responses.component';

describe('ShowResponsesComponent', () => {
  let component: ShowResponsesComponent;
  let fixture: ComponentFixture<ShowResponsesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowResponsesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowResponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
