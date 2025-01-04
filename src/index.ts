import * as net from 'net';
import Aedes from 'aedes';

const PORT = 1883;

const aedes = new Aedes({});

async function bootraps() {

    const server = net.createServer(aedes.handle);
    
    server.listen(PORT, "0.0.0.0", () => {
        console.log("mqtt server is run!")
    });

    process.on("SIGINT", () => {
        console.log("Server Close!")
        server.close();
    })
}

bootraps();