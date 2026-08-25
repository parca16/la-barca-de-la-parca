import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface PlayerSummary {
  player_name: string;
  avatar: string;
  avatarfull: string;
  profilestate: number;
  communityvisibilitystate: number;
}

export interface PlayerMatchStats {
  steamid: string;
  team: number;
  score?: number;
  stats?: {
    kills: number;
    deaths: number;
    assists: number;
    adr?: number;
    flash_assists?: number;
    utility_count?: number;
    utility_damage?: number;
    utility_successes?: number;
    wkills?: number;
    headshot_percentage?: number;
  };
  rank?: number;
  rank_id?: number;
  team_placement?: number;
}

export interface MatchEntry {
  match_id: number;
  match_hash: string;
  lobby_type: string;
  game_mode: string;
  map_id: number;
  queue_id: number;
  timestamp: number;
  end_time: number;
  ranking?: PlayerMatchStats[];
}

export const STEAM_API_KEY = 'STEAM_API_KEY';

@Injectable({
  providedIn: 'root',
})
export class SteamApiService {
  private readonly steamBaseUrl = 'https://api.steampowered.com';

  readonly mapIds: Record<number, string> = {
    0: 'Unknown',
    1: 'de_dust2',
    2: 'de_inferno',
    3: 'de_nuke',
    5: 'de_train',
    7: 'de_mirage',
    11: 'de_overpass',
    14: 'de_ancient',
    16: 'de_anubis',
    21: 'de_mills',
    22: 'de_shortdust',
    23: 'de_thera',
    24: 'de_tempest',
    25: 'de_lake',
  };

  constructor(
    private readonly http: HttpClient,
    @Inject(STEAM_API_KEY) private readonly apiKey: string
  ) {}

  private getAccountId(steamId: string): string {
    return (BigInt(steamId) - BigInt(76561197960265728)).toString();
  }

  getPlayerSummaries(steamIds: string[]): Observable<PlayerSummary[]> {
    const steamIdsParam = steamIds.join(',');
    const url = `${this.steamBaseUrl}/ISteamUser/GetPlayerSummaries/v0002/?steamids=${steamIdsParam}&key=${this.apiKey}`;

    return this.http.get<any>(url).pipe(
      map((data) => data.response || []),
      catchError(() => of([]))
    );
  }

  getMatchHistory(steamId: string): Observable<MatchEntry[]> {
    const accountId = this.getAccountId(steamId);
    const params = new HttpParams()
      .set('account_id', accountId)
      .set('game_build', '1572490')
      .set('key', this.apiKey)
      .set('limit', '50');

    return this.http.get<any>(
      `${this.steamBaseUrl}/IEconItems_730/GetGameMatchHistory/v1`,
      { params }
    ).pipe(
      map((data) => data.matches || []),
      catchError(() => of([]))
    );
  }

  getMapName(mapId: number): string {
    return this.mapIds[mapId] || 'Unknown';
  }

  getMapImageUrl(mapId: number): string {
    const mapName = this.getMapName(mapId);
    return `https://static.steampowered.com/economy/image/${mapName}/`;
  }
}