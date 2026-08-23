import { Routes } from '@angular/router';

import { Layout } from './core/layout/layout';
import { Home } from './features/home/home';
import { Team } from './features/team/team';
import { Maps } from './features/maps/maps';
import { Strategies } from './features/strategies/strategies';
import { Roles } from './features/roles/roles';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: Home },
      { path: 'team', component: Team },
      { path: 'maps', component: Maps },
      { path: 'strategies', component: Strategies },
      { path: 'roles', component: Roles },
      { path: '**', redirectTo: 'home' },
    ],
  },
];