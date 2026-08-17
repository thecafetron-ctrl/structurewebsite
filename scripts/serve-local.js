#!/usr/bin/env node

const fs = require("fs");
const http = require("http");
const path = require("path");
const { URL } = require("url");

const root = process.cwd();
const port = Number(process.env.PORT || 8743);

const rewrites = new Map([
  ["/loadhawk", "loadhawk.html"],
  ["/freight-network", "freight-network.html"],
  ["/ai-for-freight-brokers", "ai-for-freight-brokers.html"],
  ["/about/haarith-imran", "about/haarith-imran.html"],
]);

const redirects = new Map([
  ["/loadhawk.html", "/loadhawk"],
  ["/loadhawk/", "/loadhawk"],
  ["/freight-network.html", "/freight-network"],
  ["/freight-network/", "/freight-network"],
  ["/ai-for-freight-brokers.html", "/ai-for-freight-brokers"],
  ["/ai-for-freight-brokers/", "/ai-for-freight-brokers"],
  ["/about/haarith-imran.html", "/about/haarith-imran"],
  ["/about/haarith-imran/", "/about/haarith-imran"],
]);

const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

function resolveFile(urlPath) {
  if (urlPath === "/") return path.join(root, "index.html");
  if (rewrites.has(urlPath)) return path.join(root, rewrites.get(urlPath));

  const decoded = decodeURIComponent(urlPath);
  const normalized = path.normalize(decoded).replace(/^(\.\.[/\\])+/, "");
  const file = path.join(root, normalized);
  if (!file.startsWith(root)) return null;
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    return path.join(file, "index.html");
  }
  return file;
}

http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  if (redirects.has(url.pathname)) {
    res.writeHead(301, { Location: redirects.get(url.pathname) });
    res.end();
    return;
  }

  const file = resolveFile(url.pathname);
  if (!file || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }

  res.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
}).listen(port, "127.0.0.1", () => {
  console.log(`Structure local preview: http://127.0.0.1:${port}`);
});
