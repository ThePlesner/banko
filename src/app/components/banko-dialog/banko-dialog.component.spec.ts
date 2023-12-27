import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankoDialogComponent } from './banko-dialog.component';

describe('BankoDialogComponent', () => {
  let component: BankoDialogComponent;
  let fixture: ComponentFixture<BankoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankoDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BankoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
