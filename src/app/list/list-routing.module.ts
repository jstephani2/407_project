import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPage } from './list.page';

const routes: Routes = [
    {
        path: 'list',
        component: ListPage,
    },
    {
        path: 'newItem',
        loadChildren: () => import('../new-item/new-item.module').then( m => m.NewItemPageModule)
    },
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListPageRoutingModule { }
