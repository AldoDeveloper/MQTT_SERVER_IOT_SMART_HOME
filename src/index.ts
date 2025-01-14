import TcpServer from './server/tcp';
import EnvConfig from './config/config';
import WebsocketServer from './server/ws';

const PORT_TCP = 8501;
const HOST_TCP = "0.0.0.0";

const PORT_WS = 8502;
const HOST_WS = "0.0.0.0";

EnvConfig();

async function bootraps() {
    
    Promise.allSettled([
        TcpServer(PORT_TCP, HOST_TCP),
        WebsocketServer(PORT_WS, HOST_WS)
    ])
}

bootraps();