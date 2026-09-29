import { TestBed } from '@angular/core/testing';
import { Card } from './card';
import { Player } from '../../data/models/player.interface';

const mockPlayer: Player = {
  name: 'Alejo "Parca" Rivas',
  alias: 'parca',
  role: 'IGL',
  nationality: 'Egipto',
  age: 51,
  photoUrl: '/assets/players/Parca16.webp',
  joined: '2024-01',
  bio: 'In-Game Leader.',
  borderColor: '#E9FF1F',
  abbrev: 'Parca',
  steamUrl: 'https://steamcommunity.com/profiles/76561198301504889',
  faceitUrl: 'https://www.faceit.com/en/players/parca16',
  photoPosition: 'center 60%',
  posicionDesc: 'El cerebro del equipo.',
  virtudes: ['Liderazgo'],
  defectos: ['Headshots'],
  perfilPsicologico: 'Estable y metódico.',
};

describe('Card', () => {
  function createCard(player: Player = mockPlayer) {
    const fixture = TestBed.createComponent(Card);
    fixture.componentRef.setInput('player', player);
    fixture.detectChanges();
    return fixture;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Card],
    }).compileComponents();
  });

  it('should create the card', () => {
    const fixture = createCard();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show the profile tab by default', () => {
    const fixture = createCard();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.tab-perfil .value')?.textContent).toContain(mockPlayer.name);
  });

  it('should switch the active tab when a toggle is clicked', () => {
    const fixture = createCard();
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll<HTMLButtonElement>('.toggle-btn');

    buttons[1].click();
    fixture.detectChanges();

    expect(fixture.componentInstance['activeTab']).toBe('posicion');
    expect(compiled.querySelector('.tab-posicion')?.textContent).toContain(mockPlayer.posicionDesc);
  });

  it('should render the Steam and FACEIT links from the player data', () => {
    const compiled = createCard().nativeElement as HTMLElement;
    expect(compiled.querySelector('.profile-link-steam')?.getAttribute('href')).toBe(mockPlayer.steamUrl);
    expect(compiled.querySelector('.profile-link-faceit')?.getAttribute('href')).toBe(mockPlayer.faceitUrl);
  });

  it('should mark light border colors with the role-light-bg class', () => {
    const light = createCard({ ...mockPlayer, borderColor: '#ffffff' }).nativeElement as HTMLElement;
    expect(light.querySelector('.role-badge')?.classList.contains('role-light-bg')).toBe(true);

    const dark = createCard({ ...mockPlayer, borderColor: '#000000' }).nativeElement as HTMLElement;
    expect(dark.querySelector('.role-badge')?.classList.contains('role-light-bg')).toBe(false);
  });
});
