import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcharactersComponent } from './editcharacters.component';

describe('EditcharactersComponent', () => {
  let component: EditcharactersComponent;
  let fixture: ComponentFixture<EditcharactersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditcharactersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditcharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
