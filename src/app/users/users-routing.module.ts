import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './pages/layout/layout.component';
import { ListComponent } from './pages/list/list.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileGuard } from './guards/profile.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'list',  component: ListComponent },
      { path: ':id',  component: ProfileComponent, canActivate: [ProfileGuard] },
      { path: '**',  redirectTo: 'list' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
