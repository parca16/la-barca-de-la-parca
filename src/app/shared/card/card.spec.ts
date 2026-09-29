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

  it('should build the correct Steam URL from the alias', () => {
    const fixture = createCard();
    expect(fixture.componentInstance.getPlayerSteamUrl('parca')).toBe(
      'https://steamcommunity.com/profiles/76561198301504889',
    );
    expect(fixture.componentInstance.getPlayerSteamUrl('desconocido')).toBeUndefined();
  });

  it('should detect light border colors', () => {
    const fixture = createCard();
    expect(fixture.componentInstance.isLightColor('#ffffff')).toBe(true);
    expect(fixture.componentInstance.isLightColor('#000000')).toBe(false);
    expect(fixture.componentInstance.isLightColor(undefined)).toBe(false);
  });
});
