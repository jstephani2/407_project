import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponent } from './explore-container.component';
import { AddMetricPage } from '../modals/add-metric/add-metric.page'

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [ExploreContainerComponent, AddMetricPage],
  entryComponents: [AddMetricPage],
  exports: [ExploreContainerComponent]
})
export class ExploreContainerComponentModule {}
