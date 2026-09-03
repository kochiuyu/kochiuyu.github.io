import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

// Alias /styles.css to /css/academic.css for pages referencing the older style path
app.get('/styles.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'css', 'academic.css'));
});

// Serve static assets and HTML pages
app.use(express.static(__dirname, {
  extensions: ['html', 'htm']
}));

// Fallback to 404.html if route is not found
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});
