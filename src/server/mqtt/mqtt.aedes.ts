import Aedes from "aedes";
import { aedesOptions } from "./mqtt.option";
import logger from "../../logger";

const ServerMqttAedes = new Aedes({...aedesOptions});

ServerMqttAedes.on("subscribe", (sub, client) => {
    //  console.group(`client id:${client.id}`);
    //  console.log(`subscribe topic:${sub[0].topic}`);
    //  console.groupEnd();
});

ServerMqttAedes.on("unsubscribe", (unsubsribe, client) => { 

});

ServerMqttAedes.on("clientDisconnect", (client) => {
    logger.debug(`client id:${client.id} disconnected`)
});

ServerMqttAedes.on("clientError", (client, err) => {
    logger.err(`client id:${client.id} error:${err.message}`)
});

ServerMqttAedes.on("clientReady", (client) => {
    logger.debug(`client id:${client.id} clientReady`)
});

ServerMqttAedes.on("connectionError", (client) => {
    client.close();
    logger.err(`client error: ${client.id}`)
});

export default ServerMqttAedes;
