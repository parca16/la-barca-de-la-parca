import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

/**
 * Protege las rutas privadas. Si no hay sesión, redirige a `/login` guardando
 * la ruta solicitada para volver después de autenticarse.
 */
export const authGuard: CanActivateFn = async (_route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const user = await auth.ensureLoaded();
  if (user) return true;

  return router.createUrlTree(['/login'], { queryParams: { returnTo: state.url } });
};
