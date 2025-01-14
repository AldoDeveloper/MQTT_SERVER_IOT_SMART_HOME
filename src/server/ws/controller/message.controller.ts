import { WebSocket } from "ws";
import { WsSmartHome, WsSmartHomeOptions } from "../ws.interface";
import logger from "../../../logger";

export async function addGroup(
    ws: WsSmartHome, 
    value: any, 
    groups: Map<string, Set<WsSmartHomeOptions>>) : Promise<void> {

    if(!groups.has(value.groupId)){
        groups.set(value.groupId, new Set());
        ws.send(JSON.stringify({
            type: 'addGroup',
            messege: `Group ${value.groupId} created`
        }));
        return;
    };

    ws.send(
        JSON.stringify(
            {  
                type: 'error', 
                messege: `Group ${value} already exists`
            }
        )
    );
};

export async function joinGroup(
    ws: WsSmartHome, 
    value: any, 
    groups: Map<string, Set<WsSmartHomeOptions>>) : Promise<void> {
    
    if(groups.has(value.joinIdGroup)){
        groups.get(value.joinIdGroup).add({
            groupId: value.joinIdGroup,
            socket: ws
        });
        ws.send(
            JSON.stringify(
                { 
                    type: 'success', 
                    messege: `Group ${value.joinIdGroup} joined` 
                }
            )
        );
        return;
    };
    ws.send(
        JSON.stringify(
            { 
                type: 'error', 
                messege: `Error Join Group ${value.joinIdGroup}`
            }
        )
    )
}

export async function leaveGroup(
    ws: WsSmartHome, 
    value: any, 
    groups: Map<string,Set<WsSmartHome>>)  : Promise<void>{

}

export async function broadcastGroup(ws: WsSmartHome, value: any, groups: Map<string, Set<WsSmartHomeOptions>>) : Promise<void>{

    if(!groups.has(value.groupId)){
        ws.send(
            JSON.stringify(
                { 
                    type: 'error', 
                    message: `Group ${value.groupId} does not exist` 
                }
            )
        );
        return;
    }

    for(const client of groups.get(value.groupId)){
        if(client.socket.readyState === WebSocket.OPEN){
            client.socket.send(JSON.stringify({
                 type: 'message',
                 ...value
            }));
        }
    }
    
    logger.info(`📣 Message broadcasted to group: ${value.groupId} - ${value.content}`)
}