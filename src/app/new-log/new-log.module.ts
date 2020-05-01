import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewLogPageRoutingModule } from './new-log-routing.module';

import { NewLogPage } from './new-log.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewLogPageRoutingModule,
    FontAwesomeModule
  ],
  declarations: [NewLogPage]
})
export class NewLogPageModule {}
