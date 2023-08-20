import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { join, extname, dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const port = 3000;

const server = createServer(async (req, res) => {
  const url = req.url === '/' ? './html/index.html' : req.url;
  const filePath = join(__dirname, url);
  const extension = extname(filePath);
  let contentType = 'text/html';

  switch (extension) {
    case '.css':
      contentType = 'text/css';
      break;
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.png':
      contentType = 'image/png';
      break;
  }

  try {
    const data = await readFile(filePath, 'utf8');
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  } catch (err) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Archivo no encontrado');
  }
});

server.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
