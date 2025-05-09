export function audit(action, details) {
  console.debug(`[AUDIT] ${new Date().toISOString()} ${action}:`, details);
}
