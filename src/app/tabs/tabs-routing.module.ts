import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
    },
    {
        path: 'newItem',
        loadChildren: () => import('../new-item/new-item.module').then( m => m.NewItemPageModule)
    },
    {
        path: '',
        redirectTo: 'tabs',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule { }
