import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatagraphicsPage } from './datagraphics.page';

const routes: Routes = [
  {
    path: '',
    component: DatagraphicsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatagraphicsPageRoutingModule {}
