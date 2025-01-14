import { createServer } from 'net';
import ServerMqttAedes from './mqtt.aedes';
import logger from '../../logger';
import getLocalIp from '../../utility/utility.getip';

async function MQTTServer(port: number, host: string) {
    
    const mqttServer = createServer(ServerMqttAedes.handle);
    mqttServer.listen(port, host, () => {
        logger.info(`Mqtt Server Success Run , Host: ${getLocalIp()}, Port: ${port}`);
    })
}

export default MQTTServer