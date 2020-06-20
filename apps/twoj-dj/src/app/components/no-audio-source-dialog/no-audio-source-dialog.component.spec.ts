import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoAudioSourceDialogComponent } from './no-audio-source-dialog.component';

describe('NoAudioSourceDialogComponent', () => {
  let component: NoAudioSourceDialogComponent;
  let fixture: ComponentFixture<NoAudioSourceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NoAudioSourceDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoAudioSourceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
