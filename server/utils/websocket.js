const WebSocket = require('ws');

const clients = new Map();

const setupWebSocket = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws, req) => {
        const userId = req.headers['sec-websocket-protocol']; // Assuming user ID is sent in headers
        clients.set(userId, ws);

        ws.on('message', (message) => {
            const data = JSON.parse(message);
            broadcast(data);
        });

        ws.on('close', () => {
            clients.delete(userId);
        });
    });

    const broadcast = (data) => {
        clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data));
            }
        });
    };
};

module.exports = setupWebSocket;