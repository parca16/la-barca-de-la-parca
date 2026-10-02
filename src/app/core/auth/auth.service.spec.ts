import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('carga el usuario desde /api/auth/me', async () => {
    const promise = service.load();
    http.expectOne('/api/auth/me').flush({ user: { email: 'a@b.c', name: 'A' } });

    await promise;
    expect(service.user()?.email).toBe('a@b.c');
  });

  it('deja el usuario a null si no hay sesión (401)', async () => {
    const promise = service.load();
    http
      .expectOne('/api/auth/me')
      .flush({ error: 'unauthorized' }, { status: 401, statusText: 'Unauthorized' });

    await promise;
    expect(service.user()).toBeNull();
  });

  it('sanea la ruta de vuelta en la URL de login', () => {
    expect(service.loginUrl('https://evil.example')).toBe('/api/auth/login?returnTo=%2Fcontents');
    expect(service.loginUrl('/contents/abc')).toBe('/api/auth/login?returnTo=%2Fcontents%2Fabc');
  });
});
