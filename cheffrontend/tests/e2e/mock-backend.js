// File: `cheffrontend/tests/e2e/mock-backend.mjs`
import http from 'http';
import { URL } from 'url';

const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
    try {
        const url = new URL(req.url, `http://localhost:${PORT}`);
        if (url.pathname === '/health') {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('ok');
            return;
        }

        if (url.pathname.startsWith('/api')) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ ok: true, path: url.pathname, method: req.method }));
            return;
        }

        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('not found');
    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('server error');
    }
});

server.listen(PORT, () => {
    console.log(`Mock backend listening on http://localhost:${PORT}`);
});

process.on('SIGINT', () => server.close(() => process.exit(0)));
process.on('SIGTERM', () => server.close(() => process.exit(0)));
