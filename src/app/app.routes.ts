import { Routes } from '@angular/router';

// Todas las features se cargan de forma diferida para que el bundle inicial
// solo contenga el shell de la app (App + Header). Cada ruta descarga su chunk
// la primera vez que se visita.
export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/home/home').then((m) => m.Home) },
  { path: 'team', loadComponent: () => import('./features/team/team').then((m) => m.Team) },
  {
    path: 'strategies',
    loadComponent: () => import('./features/strategies/strategies').then((m) => m.Strategies),
  },
  { path: 'map/:map', loadComponent: () => import('./features/map/map').then((m) => m.MapPage) },
  {
    path: 'utilities',
    loadComponent: () => import('./features/utilities/utilities').then((m) => m.Utilities),
  },
  {
    path: 'utilities/:map',
    loadComponent: () =>
      import('./features/utilities/utility-detail/utility-detail').then((m) => m.UtilityDetail),
  },
  { path: '**', redirectTo: '' },
];
