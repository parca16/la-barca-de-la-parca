import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { MapPage } from './map';

describe('MapPage', () => {
  function createComponent(map = 'mirage') {
    TestBed.configureTestingModule({
      imports: [MapPage],
      providers: [
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ map })) } },
        { provide: Router, useValue: { navigate: () => Promise.resolve(true) } },
      ],
    });

    const fixture = TestBed.createComponent(MapPage);
    fixture.detectChanges();
    return fixture;
  }

  it('should create the map page', () => {
    const fixture = createComponent();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should resolve the map from the route parameter', () => {
    const page = createComponent('mirage').componentInstance;
    expect(page.mapKey).toBe('mirage');
    expect(page.mapName).toBe('Mirage');
    expect(page.headerImage).toContain('Mirage_header.webp');
    expect(page.mapData).not.toBeNull();
  });

  it('should fall back to dust-2 when there is no parameter', () => {
    const page = createComponent('').componentInstance;
    expect(page.mapKey).toBe('dust-2');
    expect(page.mapName).toBe('Dust 2');
  });

  it('should render the map name in the hero', () => {
    const fixture = createComponent('inferno');
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.page-hero h1')?.textContent).toContain('Inferno');
  });

  it('should navigate to the selected map', () => {
    const fixture = createComponent();
    const router = TestBed.inject(Router);
    const navigate = vi.spyOn(router, 'navigate');

    fixture.componentInstance.navigateToMap('nuke');

    expect(navigate).toHaveBeenCalledWith(['/map', 'nuke']);
  });
});
