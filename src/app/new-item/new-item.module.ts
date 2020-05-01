import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewItemPageRoutingModule } from './new-item-routing.module';

import { NewItemPage } from './new-item.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewItemPageRoutingModule,
    FontAwesomeModule
  ],
  declarations: [NewItemPage],
  exports: [NewItemPage]
})
export class NewItemPageModule {}
