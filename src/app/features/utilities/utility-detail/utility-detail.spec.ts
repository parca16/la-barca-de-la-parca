import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { UtilityDetail } from './utility-detail';

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

  it('should load utilities when a type is selected', () => {
    const page = createComponent('dust-2').componentInstance;

    page.selectType('smoke');

    expect(page.selectedType).toBe('smoke');
    expect(page.utilities.length).toBeGreaterThan(0);
  });

  it('should toggle the selected type off when clicked twice', () => {
    const page = createComponent().componentInstance;

    page.selectType('smoke');
    page.selectType('smoke');

    expect(page.selectedType).toBeNull();
    expect(page.utilities).toEqual([]);
  });

  it('should build the asset path for a utility image', () => {
    const page = createComponent('dust-2').componentInstance;
    page.selectType('smoke');
    const utility = page.utilities[0];

    expect(page.getUtilityImagePath(utility)).toBe(`/assets/utilidades/dust2/${utility.filename}`);
    expect(page.getUtilityImagePath({ filename: 'placeholder', title: '', description: '' })).toBe('');
  });

  it('should open and close the lightbox', () => {
    const page = createComponent().componentInstance;
    page.selectType('smoke');

    page.selectImage(page.utilities[0]);
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
