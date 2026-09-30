import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MapPoolGrid } from './map-pool-grid';
import { MapInfo } from '../../data/models/maps';

const mockMaps: MapInfo[] = [
  {
    key: 'dust-2',
    name: 'Dust 2',
    pool: 'active',
    cardImage: '/assets/maps/Dust2.webp',
    headerImage: '/assets/map-headers/Dust2_header.webp',
    utilitiesFolder: 'dust2',
  },
  {
    key: 'mirage',
    name: 'Mirage',
    pool: 'active',
    cardImage: '/assets/maps/Mirage.webp',
    headerImage: '/assets/map-headers/Mirage_header.webp',
    utilitiesFolder: 'mirage',
  },
];

describe('MapPoolGrid', () => {
  function createGrid() {
    const fixture = TestBed.createComponent(MapPoolGrid);
    fixture.componentRef.setInput('title', 'Map Pool Activo');
    fixture.componentRef.setInput('maps', mockMaps);
    fixture.componentRef.setInput('baseRoute', '/map');
    fixture.detectChanges();
    return fixture;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapPoolGrid],
      providers: [{ provide: Router, useValue: { navigate: () => Promise.resolve(true) } }],
    }).compileComponents();
  });

  it('should create the grid', () => {
    expect(createGrid().componentInstance).toBeTruthy();
  });

  it('should render the title and one card per map', () => {
    const compiled = createGrid().nativeElement as HTMLElement;

    expect(compiled.querySelector('.pool-label')?.textContent).toContain('Map Pool Activo');
    expect(compiled.querySelectorAll('.map-card').length).toBe(mockMaps.length);
    expect(compiled.querySelector('.map-card-name')?.textContent).toContain('Dust 2');
  });

  it('should use the map card image as background', () => {
    const compiled = createGrid().nativeElement as HTMLElement;
    const card = compiled.querySelector('.map-card') as HTMLElement;

    expect(card.style.backgroundImage).toContain(mockMaps[0].cardImage);
  });

  it('should navigate to baseRoute plus the map key when a card is clicked', () => {
    const fixture = createGrid();
    const compiled = fixture.nativeElement as HTMLElement;
    const router = TestBed.inject(Router);
    const navigate = vi.spyOn(router, 'navigate');

    (compiled.querySelectorAll('.map-card')[1] as HTMLElement).click();

    expect(navigate).toHaveBeenCalledWith(['/map', 'mirage']);
  });
});
