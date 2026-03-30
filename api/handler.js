import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createRequire } from 'module';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default async function handler(req, res) {
  try {
    // Importar el servidor compilado
    const serverModule = await import(join(__dirname, '../dist/manuelrevuelto.com/server/server.mjs'));
    const { reqHandler } = serverModule;

    if (!reqHandler) {
      console.error('[Handler] reqHandler not found in server module');
      return res.status(500).json({ error: 'Server handler not initialized' });
    }

    return await reqHandler(req, res);
  } catch (error) {
    console.error('[Handler] Error:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
