import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarLiteComponent } from './sidebar-lite.component';

describe('SidebarLiteComponent', () => {
  let component: SidebarLiteComponent;
  let fixture: ComponentFixture<SidebarLiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarLiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarLiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
