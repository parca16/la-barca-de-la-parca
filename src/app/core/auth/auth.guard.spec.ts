import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { authGuard } from './auth.guard';

const ROUTE = undefined as never;
const STATE = { url: '/contents' } as never;

function runGuard() {
  return TestBed.runInInjectionContext(() => authGuard(ROUTE, STATE));
}

describe('authGuard', () => {
  it('permite el paso cuando hay sesión', async () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: { ensureLoaded: async () => ({ email: 'a@b.c' }) } },
        { provide: Router, useValue: { createUrlTree: () => 'urlTree' } },
      ],
    });

    await expect(runGuard()).resolves.toBe(true);
  });

  it('redirige a /login conservando la ruta solicitada', async () => {
    const createUrlTree = vi.fn(() => 'urlTree');
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: { ensureLoaded: async () => null } },
        { provide: Router, useValue: { createUrlTree } },
      ],
    });

    await expect(runGuard()).resolves.toBe('urlTree');
    expect(createUrlTree).toHaveBeenCalledWith(['/login'], {
      queryParams: { returnTo: '/contents' },
    });
  });
});
