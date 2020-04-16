import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewLogPage } from './new-log.page';

describe('NewLogPage', () => {
  let component: NewLogPage;
  let fixture: ComponentFixture<NewLogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewLogPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewLogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
