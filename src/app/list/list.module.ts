import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ListPageRoutingModule } from './list-routing.module';

import { ListPage } from './list.page';
import { NewItemPage } from '../new-item/new-item.page';
import { TrackerManager } from 'src/providers/tracker-manager';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ListPageRoutingModule
    ],
    declarations: [ListPage,
        ExploreContainerComponent
    ],
    providers: [
        TrackerManager
    ]
})
export class ListPageModule { }
