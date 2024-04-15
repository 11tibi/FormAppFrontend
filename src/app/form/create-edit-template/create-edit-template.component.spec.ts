import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditTemplateComponent } from './create-edit-template.component';

describe('CreateEditTemplateComponent', () => {
  let component: CreateEditTemplateComponent;
  let fixture: ComponentFixture<CreateEditTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateEditTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
