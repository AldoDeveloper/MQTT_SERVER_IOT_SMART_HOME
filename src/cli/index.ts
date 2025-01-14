import inquirer from 'inquirer';
import logger from '../logger';
import EnvConfig from '../config/config';
import optionMqttClient from './options/mqtt.option';

const username_verify = "aldo1909";
const password_verify = "aldo12345";

EnvConfig();

export async function CLI() {

    inquirer.prompt([
        {
            type: "input",
            name: "username",
            message: "Username [CLI]:",
        },
        {
            type: "password",
            name: "password",
            message: "Password [CLI]:",
        }

    ]).then((answer) => {

        const username = answer.username;
        const password = answer.password;

        if (username_verify !== username || password_verify !== password) {
            logger.err("Invalid username or password");
            process.exit(0);
        };
        console.log("\n");

        inquirer.prompt([
            {
                type: "list",
                name: "option",
                message: '🛠️ Select an option:',
                choices: [
                    {
                        name: '📊 Connect to MQTT',
                        value: "MQTT"
                    },
                    {
                        name: "📊 Connect to TCP",
                        value: "TCP"
                    },
                    {
                        name: "📊 Connect to HTTP",
                        value: "HTTP"
                    }
                ]
            }
        ]).then((answer) => {

            const option = answer.option;

            switch (option) {
                case "MQTT":
                    
                    optionMqttClient();
                    // return clearTimeout(intervalTimeOut);

                    break;
                default:
                    break;
            }
        })
    })
}
CLI();