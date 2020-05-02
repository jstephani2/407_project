import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ListPageRoutingModule } from './list-routing.module';

import { ListPage } from './list.page';
import { TrackerManager } from 'src/providers/tracker-manager';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ListPageRoutingModule,
        FontAwesomeModule
    ],
    declarations: [ListPage],
    entryComponents: [],
    providers: [
        TrackerManager
    ]
})
export class ListPageModule { }
