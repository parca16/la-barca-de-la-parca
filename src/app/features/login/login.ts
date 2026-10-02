import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { sanitizeReturnTo } from '../../core/auth/return-to';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected readonly auth = inject(AuthService);

  /** Ruta a la que volver tras autenticarse. */
  protected readonly returnTo = signal('/contents');
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly isUnauthorized = signal(false);

  constructor() {
    const params = this.route.snapshot.queryParamMap;
    const returnTo = sanitizeReturnTo(params.get('returnTo'));
    this.returnTo.set(returnTo);
    this.errorMessage.set(this.describeError(params.get('error')));
    this.isUnauthorized.set(params.get('error') === 'unauthorized');

    // Si ya hay sesión, no tiene sentido quedarse en el login.
    if (this.auth.user()) {
      void this.router.navigateByUrl(returnTo);
    }
  }

  protected login(): void {
    window.location.href = this.auth.loginUrl(this.returnTo());
  }

  protected continueTo(): void {
    void this.router.navigateByUrl(this.returnTo());
  }

  private describeError(error: string | null): string | null {
    switch (error) {
      case 'unauthorized':
        return 'Tu cuenta no está autorizada para acceder a esta sección.';
      case 'state':
        return 'La sesión de acceso caducó o no es válida. Inténtalo de nuevo.';
      case 'oauth':
      case 'config':
        return 'No se pudo completar el inicio de sesión. Inténtalo de nuevo.';
      default:
        return null;
    }
  }
}
