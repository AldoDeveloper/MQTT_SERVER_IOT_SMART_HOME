import { IncomingMessage } from 'http';
import logger from "../../logger";
import { WsSmartHome, WsSmartHomeOptions } from "./ws.interface";
import { scemaMessageWs } from './scema/scema.message';
import { addGroup, joinGroup } from './controller';
import { v4 as uuidv4 } from 'uuid';
import { broadcastGroup } from './controller/message.controller';

const groupWs = new Map<string, Set<WsSmartHomeOptions>>;

export default async function WsConnection(ws: WsSmartHome, req: IncomingMessage, clientToken: string) {
    
    logger.info(`New connection from client id: ${clientToken}`);

    ws.on("ping", (data) => {
        logger.debug("Ping to")
    });

    ws.on("pong", (data) => {
        logger.info(data.toString());
        logger.info("Received to Client");
    });

    ws.on("message", async (data, isBinary) => {

        try{
            const dataJSON = JSON.parse(data.toString());
            const value    = await scemaMessageWs.validateAsync({
                ...dataJSON,
                groupId: 
                    dataJSON.type  === 'listGroup' ? undefined 
                    :dataJSON.type === "message" ? dataJSON.groupId : uuidv4(),
            });


            switch(value.type){

                case "message":
                    await broadcastGroup(ws, value, groupWs)
                    break;

                case "addGroup":
                    await addGroup(ws, value, groupWs);
                    break;

                case "joinGroup":
                    await joinGroup(ws, value, groupWs);
                    break;

                case "listGroup":
                    const groups = Array.from(groupWs.keys());
                    ws.send(JSON.stringify(groups));
                    break;

                default:
                    break;
            }

        }catch(err){
            logger.err(err.message);
            ws.send(
                JSON.stringify({ type: "error", message: err.message })
            )
        }
    });

    ws.on("close", (data) => {
        logger.debug(`Client ${clientToken} disconnected`);
    });

    ws.on("error", (err) => {
        logger.err(err.message)
    });
} 