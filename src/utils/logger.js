import fs from 'fs';
export function logError(err) {
  const entry = `${new Date().toISOString()} ERROR: ${err.stack || err}\n`;
  fs.mkdirSync('logs', { recursive: true });
  fs.appendFileSync('logs/error.log', entry);
}
