import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RootPage } from './root.page';

const routes: Routes = [
  {
    path: 'root',
    component: RootPage
  },
  {
    path: '',
    redirectTo: '/list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RootPageRoutingModule {}
