import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewLogPage } from './new-log.page';

const routes: Routes = [
  {
    path: '',
    component: NewLogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewLogPageRoutingModule {}
