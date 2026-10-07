import { pingValue } from './_lib/pinglib.js';

export default function handler(_req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(pingValue()));
}
