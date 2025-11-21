#!/usr/bin/env node
// Simple dependency checker for native modules used by the project.
const deps = ['better-sqlite3', 'bcryptjs'];

function check() {
  let ok = true;
  deps.forEach((d) => {
    try {
      require.resolve(d);
      console.log(`OK: ${d} is installed`);
    } catch {
      console.error(`MISSING: ${d} is not installed. Run 'npm install ${d}' and ensure build tools are available.`);
      ok = false;
    }
  });
  if (!ok) process.exit(1);
}

check();
