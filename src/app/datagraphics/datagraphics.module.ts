import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatagraphicsPageRoutingModule } from './datagraphics-routing.module';

import { DatagraphicsPage } from './datagraphics.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatagraphicsPageRoutingModule
  ],
  declarations: [DatagraphicsPage]
})
export class DatagraphicsPageModule {}
