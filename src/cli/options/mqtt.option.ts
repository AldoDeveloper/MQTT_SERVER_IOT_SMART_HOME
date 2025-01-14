
import mqtt from 'mqtt';
import getLocalIp from '../../utility/utility.getip';
import logger from '../../logger';
import inquirer from 'inquirer';

function optionMqttClient() {

    const ip   =  getLocalIp();
    const port = parseInt(process.env.MQTT_PORT) || 8500;;

    const client = mqtt.connect(`ws://${ip}:8502/mqtt`);

    // client.setMaxListeners(Infinity);
    
    client.on("offline", () => {
        console.log("Client is offline");
    });

    client.on("connect", (data) => {
        logger.info("ip server is connected!")
    });

    client.on("disconnect", (packet) => {
        console.log(`client id ${packet.messageId} disconnected`);
    });

    client.on("error", (err) => {

    });

    client.on("message", (topic, payload) => {
        const object = {
            topic,
            payload: JSON.parse(payload.toString())
        };
        logger.info("LOGGER MQTT SERVER")
    });

    client.subscribe(['app', "lamp"]);
};

export default optionMqttClient