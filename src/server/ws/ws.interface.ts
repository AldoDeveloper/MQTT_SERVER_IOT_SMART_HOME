
import { WebSocket } from 'ws';

export interface WsSmartHome extends WebSocket {
    
}

export interface WsSmartHomeOptions {
    groupId: string;
    socket: WsSmartHome
}