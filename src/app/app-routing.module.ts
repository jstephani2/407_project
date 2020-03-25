import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },  {
    path: 'add-metric',
    loadChildren: () => import('./modals/add-metric/add-metric.module').then( m => m.AddMetricPageModule)
  },
  {
    path: 'add-metric',
    loadChildren: () => import('./modals/add-metric/add-metric.module').then( m => m.AddMetricPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
