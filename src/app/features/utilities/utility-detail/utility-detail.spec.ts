import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { UtilityDetail } from './utility-detail';
import { imageVariant } from '../../../shared/image-utils';

describe('UtilityDetail', () => {
  function createComponent(map = 'dust-2') {
    TestBed.configureTestingModule({
      imports: [UtilityDetail],
      providers: [
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ map })) } },
        { provide: Router, useValue: { navigate: () => Promise.resolve(true) } },
      ],
    });

    const fixture = TestBed.createComponent(UtilityDetail);
    fixture.detectChanges();
    return fixture;
  }

  it('should create the utility detail page', () => {
    const fixture = createComponent();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should expose the four grenade types', () => {
    const page = createComponent().componentInstance;
    expect(page.grenadeTypes.map(t => t.key)).toEqual(['smoke', 'molotov', 'flash', 'he']);
  });

  it('should load utilities when a type is selected', async () => {
    const page = createComponent('dust-2').componentInstance;

    page.selectType('smoke');

    expect(page.selectedType).toBe('smoke');
    await vi.waitFor(() => expect(page.utilities().length).toBeGreaterThan(0));
  });

  it('should render the utility cards once the async data loads', async () => {
    const fixture = createComponent('dust-2');
    fixture.autoDetectChanges();
    fixture.componentInstance.selectType('smoke');

    await vi.waitFor(() => {
      expect(fixture.nativeElement.querySelector('.utility-card')).toBeTruthy();
    });
  });

  it('should toggle the selected type off when clicked twice', () => {
    const page = createComponent().componentInstance;

    page.selectType('smoke');
    page.selectType('smoke');

    expect(page.selectedType).toBeNull();
    expect(page.utilities()).toEqual([]);
  });

  it('should precompute the asset path when a type is selected', async () => {
    const page = createComponent('dust-2').componentInstance;
    page.selectType('smoke');
    await vi.waitFor(() => expect(page.utilities().length).toBeGreaterThan(0));

    const utility = page.utilities()[0];

    expect(utility.imagePath).toBe(`/assets/utilidades/dust2/${utility.filename}`);
  });

  it('should precompute a responsive srcset for each utility', async () => {
    const page = createComponent('dust-2').componentInstance;
    page.selectType('smoke');
    await vi.waitFor(() => expect(page.utilities().length).toBeGreaterThan(0));
    const utility = page.utilities()[0];

    expect(utility.imageSrcset).toBe(
      `${imageVariant(utility.imagePath, 640)} 640w, ${imageVariant(utility.imagePath, 1280)} 1280w, ${utility.imagePath} 1920w`
    );
  });

  it('should build a responsive srcset for the hero', () => {
    const page = createComponent('mirage').componentInstance;

    expect(page.headerSrcset).toContain('Mirage_header-960.webp 960w');
    expect(page.headerSrcset).toContain('Mirage_header.webp 1920w');
  });

  it('should flag the "en desarrollo" state instead of injecting a placeholder utility', async () => {
    const page = createComponent('mapa-inventado').componentInstance;
    page.selectType('smoke');

    await vi.waitFor(() => expect(page.isDeveloping()).toBe(true));
    expect(page.utilities()).toEqual([]);
  });

  it('should not flag the "en desarrollo" state when the type has utilities', async () => {
    const page = createComponent('dust-2').componentInstance;
    page.selectType('smoke');

    await vi.waitFor(() => expect(page.utilities().length).toBeGreaterThan(0));
    expect(page.isDeveloping()).toBe(false);
  });

  it('should render the "en desarrollo" card when there are no utilities', async () => {
    const fixture = createComponent('mapa-inventado');
    fixture.autoDetectChanges();
    fixture.componentInstance.selectType('smoke');

    await vi.waitFor(() => {
      expect(fixture.nativeElement.querySelector('.utility-placeholder')).toBeTruthy();
    });
    expect(fixture.nativeElement.querySelector('.utility-image-wrapper img')).toBeFalsy();
  });

  it('should open and close the lightbox', async () => {
    const page = createComponent().componentInstance;
    page.selectType('smoke');
    await vi.waitFor(() => expect(page.utilities().length).toBeGreaterThan(0));

    page.selectImage(page.utilities()[0]);
    expect(page.selectedImage).not.toBeNull();

    page.closeLightbox();
    expect(page.selectedImage).toBeNull();
  });

  it('should navigate back to the map strategies', () => {
    const fixture = createComponent('mirage');
    const router = TestBed.inject(Router);
    const navigate = vi.spyOn(router, 'navigate');

    fixture.componentInstance.navigateToStrategies();

    expect(navigate).toHaveBeenCalledWith(['/map', 'mirage']);
  });
});
