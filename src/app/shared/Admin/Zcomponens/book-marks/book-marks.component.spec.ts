import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookMarksComponent } from './book-marks.component';

describe('BookMarksComponent', () => {
  let component: BookMarksComponent;
  let fixture: ComponentFixture<BookMarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookMarksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
