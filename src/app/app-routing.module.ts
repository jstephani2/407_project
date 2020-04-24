import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'new-item',
    loadChildren: () => import('./new-item/new-item.module').then( m => m.NewItemPageModule)
  },
  {
    path: 'new-log',
    loadChildren: () => import('./new-log/new-log.module').then( m => m.NewLogPageModule)
  },  {
    path: 'datagraphics',
    loadChildren: () => import('./datagraphics/datagraphics.module').then( m => m.DatagraphicsPageModule)
  },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
