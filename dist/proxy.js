"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http = __importStar(require("http"));
var http_proxy_1 = __importDefault(require("http-proxy"));
exports.createProxy = function (opts) {
    return new Promise(function (resolve, reject) {
        var proxy = http_proxy_1.default.createProxyServer({});
        proxy.on('proxyReq', function (proxyReq, req, res) { });
        proxy.on('proxyRes', function (proxyReq, req, res) {
            opts.isUseCors && enableCors(req, res);
        });
        var server = http.createServer(function (req, res) {
            if (req.method === 'OPTIONS') {
                enableCors(req, res);
                res.writeHead(200);
                res.end();
                return;
            }
            var protocal = 'http://';
            proxy.web(req, res, {
                target: "" + protocal + opts.target,
                changeOrigin: opts.isUseCors,
            });
        });
        server.listen(opts.localPort, resolve);
    });
};
var enableCors = function (req, res) {
    if (req.headers['access-control-request-method']) {
        res.setHeader('access-control-allow-methods', req.headers['access-control-request-method']);
    }
    if (req.headers['access-control-request-headers']) {
        res.setHeader('access-control-allow-headers', req.headers['access-control-request-headers']);
    }
    if (req.headers.origin) {
        res.setHeader('access-control-allow-origin', req.headers.origin);
        res.setHeader('access-control-allow-credentials', 'true');
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJveHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcHJveHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEseUNBQTZCO0FBQzdCLDBEQUFtQztBQUV0QixRQUFBLFdBQVcsR0FBRyxVQUFDLElBSTNCO0lBQ0csT0FBQSxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1FBQ3hCLElBQU0sS0FBSyxHQUFHLG9CQUFTLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFOUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsVUFBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBTSxDQUFDLENBQUMsQ0FBQztRQUVqRCxLQUFLLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxVQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsR0FBRztZQUNwQyxJQUFJLENBQUMsU0FBUyxJQUFJLFVBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQUMsR0FBRyxFQUFFLEdBQUc7WUFDdEMsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFBRTtnQkFDMUIsVUFBVSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDckIsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDbkIsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUNWLE9BQU87YUFDVjtZQUVELElBQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQztZQUMzQixLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUU7Z0JBQ2hCLE1BQU0sRUFBRSxLQUFHLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBUTtnQkFDbkMsWUFBWSxFQUFFLElBQUksQ0FBQyxTQUFTO2FBQy9CLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzNDLENBQUMsQ0FBQztBQXpCRixDQXlCRSxDQUFDO0FBRVAsSUFBTSxVQUFVLEdBQUcsVUFDZixHQUF5QixFQUN6QixHQUF3QjtJQUV4QixJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsK0JBQStCLENBQUMsRUFBRTtRQUM5QyxHQUFHLENBQUMsU0FBUyxDQUNULDhCQUE4QixFQUM5QixHQUFHLENBQUMsT0FBTyxDQUFDLCtCQUErQixDQUFFLENBQ2hELENBQUM7S0FDTDtJQUVELElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxnQ0FBZ0MsQ0FBQyxFQUFFO1FBQy9DLEdBQUcsQ0FBQyxTQUFTLENBQ1QsOEJBQThCLEVBQzlCLEdBQUcsQ0FBQyxPQUFPLENBQUMsZ0NBQWdDLENBQUUsQ0FDakQsQ0FBQztLQUNMO0lBRUQsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtRQUNwQixHQUFHLENBQUMsU0FBUyxDQUFDLDZCQUE2QixFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakUsR0FBRyxDQUFDLFNBQVMsQ0FBQyxrQ0FBa0MsRUFBRSxNQUFNLENBQUMsQ0FBQztLQUM3RDtBQUNMLENBQUMsQ0FBQyJ9