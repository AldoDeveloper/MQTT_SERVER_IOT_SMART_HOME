import { AedesOptions } from "aedes";

export const aedesOptions : AedesOptions = {

    authenticate : async function (client, username, password, callback) {
        callback(null, true);
    },

    authorizePublish : async function (client, packet, callback) {
        callback(null);
    },

    authorizeSubscribe : async function (client, subscription, callback) {
        console.log(subscription)
        callback(null, subscription)
    },

    published : async function(packet, client){

    }
};