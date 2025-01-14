import * as net from 'net'
import logger from '../../logger';
import getLocalIp from '../../utility/utility.getip';
import { v4 as uuidV4 } from "uuid";
import { SocketTCPSmartHome } from './interface';
import PayloadErrorTCP from './payload/payload.err';

const ClientsConnect : Set<net.Socket> = new Set();

export default async function TcpServer(port: number, host: string) {
    
    const tcp = new net.Server({}, (socket: SocketTCPSmartHome) => {

        socket.clientToken = uuidV4();
        
        ClientsConnect.add(socket);

        socket.on("connect", async() => {
            console.log('Client connected!');
        });

        socket.on("data", async(buffer) => {
             try{
                const body = JSON.parse(buffer.toString());
                console.log(body)
             }catch(err){
                const payloadErr = new PayloadErrorTCP({ error: err.message })
                socket.write(payloadErr.toJson());
             }
        });
        
        socket.on("end", () => {
            if(ClientsConnect.has(socket)){
                ClientsConnect.delete(socket)
            }
        });

        socket.on('error', (err) => {
            console.error(err.message)
        });

        socket.on("ready", async() => {
            console.log(`Client ${socket.clientToken} ready`);
        });

    });

    tcp.listen(port || 5500, host || "0.0.0.0", () => {
         logger.info(`TCP Server Success Run , Host: ${getLocalIp()}, Port: ${port}`)
    });
}
