import { imageVariant } from './image-utils';

describe('imageVariant', () => {
  it('inserta el ancho antes de la extensión .webp', () => {
    expect(imageVariant('/assets/utilidades/dust2/flash_corta.webp', 640)).toBe(
      '/assets/utilidades/dust2/flash_corta-640.webp'
    );
  });

  it('respeta rutas que no terminan en .webp', () => {
    expect(imageVariant('/assets/foo', 960)).toBe('/assets/foo');
  });
});
