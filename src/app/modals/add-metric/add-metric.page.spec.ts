import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddMetricPage } from './add-metric.page';

describe('AddMetricPage', () => {
  let component: AddMetricPage;
  let fixture: ComponentFixture<AddMetricPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMetricPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddMetricPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
