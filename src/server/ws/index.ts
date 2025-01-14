import { createServer as createServeHttp } from 'http';
import { WebSocket } from 'ws';
import express from 'express';
import logger from '../../logger';
import route from '../http';
import { socketError } from '../../error';
import { WsHandleError } from './ws.exception';
import WsConnection from './ws.connection';
import { v4 } from 'uuid';
import ServerMqttAedes from '../mqtt/mqtt.aedes';

const pathnames = ["logger", "iot", "diagnostic", "mqtt"];
const app = express();


app.use("api", route);

async function WebsocketServer(port: number, host: string) {

    const httpServer = createServeHttp(app);

    const wss = new WebSocket.Server({ noServer: true });
    const wsMqtt = new WebSocket.Server({ noServer: true });

    wsMqtt.on("connection", async (socket, req) => {
        const streamWs = WebSocket.createWebSocketStream(socket);
        ServerMqttAedes.handle(streamWs, req);
    });

    wss.on("connection", WsConnection);
    wss.on("error", WsHandleError);

    httpServer.on("connection", (socket) => {

        socket.setTimeout(10000);

        socket.on("timeout", () => {
            console.log("timeout protocol")
        });

        socket.on("data", (data) => {

        });
    });

    httpServer.on("upgrade", function upgrade(req, socket, head) {

        const { pathname } = new URL(req.url, "ws://192.168.1.9:8502");
        const hashPathname = pathname.substring(1, pathname.length);
        const client_id = v4();

        try {
            socket.on("error", socketError);
            socket.removeListener("error", socketError);

            if (hashPathname === "mqtt") {
                wsMqtt.handleUpgrade(req, socket, head, function (ws) {
                    wsMqtt.emit("connection", ws, req, client_id);
                });
                return;
            }

            if (pathnames.includes(hashPathname)) {
                wss.handleUpgrade(req, socket, head, function (websocket) {
                    wss.emit("connection", websocket, req, client_id);
                });
            }

            if (!pathnames.includes(hashPathname) && hashPathname !== "mqtt") {
                wsMqtt.close();
                wss.close();
            }

        } catch (err) {
            console.log(err.message);
        }
    });

    httpServer.listen(port || 8502, host || "0.0.0.0", () => {
        logger.info("Https Server Connect");
    });

    // mqttServer.listen(PORT_MQTT, HOST_MQTT, () => {
    //     logger.info("Mqtt Server Connect");
    // });
};

export default WebsocketServer;