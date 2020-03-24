import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewItemPageRoutingModule } from './new-item-routing.module';

import { NewItemPage } from './new-item.page';
import { TrackerManager } from 'src/providers/tracker-manager';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewItemPageRoutingModule
  ],
  declarations: [NewItemPage],
  providers: [
      Storage,
      TrackerManager
  ]
})
export class NewItemPageModule {}
