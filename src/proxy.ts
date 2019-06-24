import * as http from 'http';
import httpProxy from 'http-proxy';

export const createProxy = (opts: {
    target: string;
    localPort: number;
    isUseCors?: boolean;
}) =>
    new Promise((resolve, reject) => {
        const proxy = httpProxy.createProxyServer({});

        proxy.on('proxyReq', (proxyReq, req, res) => {});

        proxy.on('proxyRes', (proxyReq, req, res) => {
            opts.isUseCors && enableCors(req, res);
        });

        const server = http.createServer((req, res) => {
            if (req.method === 'OPTIONS') {
                enableCors(req, res);
                res.writeHead(200);
                res.end();
                return;
            }

            const protocal = 'http://';
            proxy.web(req, res, {
                target: `${protocal}${opts.target}`,
                changeOrigin: opts.isUseCors,
            });
        });

        server.listen(opts.localPort, resolve);
    });

const enableCors = function(
    req: http.IncomingMessage,
    res: http.ServerResponse,
) {
    if (req.headers['access-control-request-method']) {
        res.setHeader(
            'access-control-allow-methods',
            req.headers['access-control-request-method']!,
        );
    }

    if (req.headers['access-control-request-headers']) {
        res.setHeader(
            'access-control-allow-headers',
            req.headers['access-control-request-headers']!,
        );
    }

    if (req.headers.origin) {
        res.setHeader('access-control-allow-origin', req.headers.origin);
        res.setHeader('access-control-allow-credentials', 'true');
    }
};
