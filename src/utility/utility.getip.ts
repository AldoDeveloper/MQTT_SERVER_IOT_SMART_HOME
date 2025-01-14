import { networkInterfaces } from 'os'

export default function getLocalIp() {

    const interfaces = networkInterfaces();
    
    for(const interfaceName in interfaces) {
        const networkInterface  = interfaces[interfaceName];
        for(const iface of networkInterface){
             if(iface.family === 'IPv4' && iface.internal === false) {
                return iface.address
             }
        }
    }
    return null
}