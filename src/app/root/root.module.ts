import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RootPageRoutingModule } from './root-routing.module';

import { RootPage } from './root.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RootPageRoutingModule
  ],
  declarations: [RootPage]
})
export class TabsPageModule {}
