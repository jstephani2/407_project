import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DatagraphicsPage } from './datagraphics.page';

describe('DatagraphicsPage', () => {
  let component: DatagraphicsPage;
  let fixture: ComponentFixture<DatagraphicsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatagraphicsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DatagraphicsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
