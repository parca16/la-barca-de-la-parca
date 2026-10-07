import { defineConfig } from 'vitest/config';

// Tests del backend de Vercel Functions (`api/`). Se ejecutan aparte de los
// tests de Angular (que usan el builder de `@angular/build`). Entorno Node.
export default defineConfig({
  test: {
    include: ['api/**/*.spec.js'],
    environment: 'node',
    globals: true,
  },
});
