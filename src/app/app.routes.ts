import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Team } from './features/team/team';
import { Strategies } from './features/strategies/strategies';
import { MapPage } from './features/map/map';
import { Utilities } from './features/utilities/utilities';
import { UtilityDetail } from './features/utilities/utility-detail/utility-detail';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'team', component: Team },
  { path: 'strategies', component: Strategies },
  { path: 'map/:map', component: MapPage },
  { path: 'utilities', component: Utilities },
  { path: 'utilities/:map', component: UtilityDetail },
  { path: '**', redirectTo: '' },
];