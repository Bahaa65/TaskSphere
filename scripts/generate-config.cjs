// Generates Angular environment from root .env
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });

const envOut = {
  production: process.env.NODE_ENV === 'production',
  supabaseUrl: process.env.NG_APP_SUPABASE_URL || '',
  supabaseAnonKey: process.env.NG_APP_SUPABASE_ANON_KEY || '',
  hfApiKey: process.env.HF_API_KEY || ''
};

const target = path.resolve(process.cwd(), 'apps/web/src/environments/environment.ts');
const content = `export const environment = ${JSON.stringify(envOut, null, 2)};\n`;
fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(target, content);
console.log('Generated', target);


