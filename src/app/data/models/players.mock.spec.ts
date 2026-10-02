import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { Player } from './player.interface';
import { reserves, starters } from './players.mock';

// El servidor de estadísticas (server/server.js) es un proyecto npm aparte y
// mantiene su propio mapa alias -> SteamID64. Este test actúa de guardián para
// que frontend y servidor no vuelvan a desincronizarse (issue #14).
const SERVER_PATH = resolve(process.cwd(), 'server', 'server.js');
const STEAM_ID_REGEX = /\/(?:profiles)\/(\d{17})/;

function leerSteamIdsDelServidor(): Record<string, string> {
  const source = readFileSync(SERVER_PATH, 'utf8');
  const ids: Record<string, string> = {};
  const entryRegex = /(\w+):\s*'(\d{17})'/g;
  let match: RegExpExecArray | null;

  while ((match = entryRegex.exec(source)) !== null) {
    ids[match[1]] = match[2];
  }

  return ids;
}

function steamIdDesdeUrl(player: Player): string | null {
  return player.steamUrl?.match(STEAM_ID_REGEX)?.[1] ?? null;
}

describe('players.mock (Steam IDs)', () => {
  const serverIds = leerSteamIdsDelServidor();
  const frontendPlayers = [...starters, ...reserves];

  it('debería encontrar los IDs de Steam definidos en el servidor', () => {
    expect(Object.keys(serverIds).length).toBeGreaterThan(0);
  });

  it('debería exponer exactamente los mismos alias que el servidor', () => {
    const aliasFrontend = frontendPlayers.map((player) => player.alias).sort();
    const aliasServidor = Object.keys(serverIds).sort();

    expect(aliasFrontend).toEqual(aliasServidor);
  });

  it('debería usar la SteamID64 del servidor para cada alias', () => {
    for (const player of frontendPlayers) {
      expect(
        steamIdDesdeUrl(player),
        `steamUrl de ${player.alias} en formato /profiles/<steamID64>`,
      ).not.toBeNull();
      expect(steamIdDesdeUrl(player), `SteamID de ${player.alias}`).toBe(serverIds[player.alias]);
    }
  });
});
