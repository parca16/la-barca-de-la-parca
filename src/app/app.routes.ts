import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Team } from './features/team/team';
import { Strategies } from './features/strategies/strategies';
import { MapPage } from './features/map/map';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'team', component: Team },
  { path: 'strategies', component: Strategies },
  { path: 'map/:map', component: MapPage },
  { path: '**', redirectTo: '' },
];