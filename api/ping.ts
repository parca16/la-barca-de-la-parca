interface MinimalResponse {
  statusCode: number;
  setHeader(name: string, value: string): void;
  end(chunk?: string): void;
}

/** Diagnóstico temporal: función sin ningún import. */
export default function handler(req: { method?: string }, res: MinimalResponse): void {
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify({ ok: true, variant: 'sin-imports' }));
}
