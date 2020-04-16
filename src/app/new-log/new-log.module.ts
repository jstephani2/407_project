import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewLogPageRoutingModule } from './new-log-routing.module';

import { NewLogPage } from './new-log.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewLogPageRoutingModule
  ],
  declarations: [NewLogPage]
})
export class NewLogPageModule {}
