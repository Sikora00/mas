import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalRadioSelectionDialogComponent } from './external-radio-selection-dialog.component';

describe('ExternalRadioSelectionDialogComponent', () => {
  let component: ExternalRadioSelectionDialogComponent;
  let fixture: ComponentFixture<ExternalRadioSelectionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExternalRadioSelectionDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalRadioSelectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
