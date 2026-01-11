import http from "http";
import { URL } from "url";

const PORT = Number(process.env.PORT || 8080);

function safeParseJson(str) {
    try {
        return JSON.parse(str);
    } catch {
        return str;
    }
}

const server = http.createServer((req, res) => {
    try {
        const base = `http://localhost:${PORT}`;
        const url = new URL(req.url || "/", base);

        // CORS / preflight
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
        if (req.method === "OPTIONS") {
            res.writeHead(204);
            return res.end();
        }

        console.log(`[mock] ${req.method} ${url.pathname}`);

        if (url.pathname === "/health") {
            res.writeHead(200, { "Content-Type": "text/plain" });
            return res.end("ok");
        }

        if (url.pathname.startsWith("/api")) {
            let body = "";
            req.on("data", (chunk) => (body += chunk));
            req.on("end", () => {
                const parsedBody = body ? safeParseJson(body) : null;
                const response = {
                    ok: true,
                    path: url.pathname,
                    method: req.method,
                    query: Object.fromEntries(url.searchParams),
                    body: parsedBody,
                };
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(response));
            });
            return;
        }

        // simple placeholder for websocket path used by frontend hook
        if (url.pathname === "/ws" || url.pathname.startsWith("/sockjs")) {
            res.writeHead(200, { "Content-Type": "text/plain" });
            return res.end("mock backend: no websocket support in this mock");
        }

        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("not found");
    } catch (err) {
        console.error("[mock] error handling request:", err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("server error");
    }
});

server.listen(PORT, () => {
    console.log(`Mock backend listening on http://localhost:${PORT}`);
});

// graceful shutdown for CI
function shutdown(signal) {
    console.log(`Mock backend received ${signal}, shutting down...`);
    server.close(() => {
        console.log("Mock backend closed");
        process.exit(0);
    });
}
process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("uncaughtException", (err) => {
    console.error("Uncaught exception in mock backend:", err);
    process.exit(1);
});
process.on("unhandledRejection", (err) => {
    console.error("Unhandled rejection in mock backend:", err);
});
