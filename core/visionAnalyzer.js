import fs from 'fs';
import path from 'path';

const BASE_DIR = path.join(process.cwd(), 'vunocode-2.0-core');

export async function analyzeStructure() {
  const expectedModules = ['pages/index.jsx', 'pages/login.jsx', 'pages/dashboard.jsx', 'components/Sidebar.jsx', 'api/auth.js'];
  const existing = [];
  const missing = [];

  for (const mod of expectedModules) {
    const fullPath = path.join(BASE_DIR, mod);
    if (fs.existsSync(fullPath)) {
      existing.push(mod);
    } else {
      missing.push(mod);
    }
  }

  return {
    summary: {
      totalExpected: expectedModules.length,
      found: existing.length,
      missing: missing.length
    },
    missingModules: missing,
    existingModules: existing
  };
}
