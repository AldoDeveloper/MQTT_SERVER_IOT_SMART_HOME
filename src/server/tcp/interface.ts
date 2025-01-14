import { Socket } from 'net';

export type MessageType = "auth" | "sign-in" | "sign-up";

export interface SocketTCPSmartHome extends Socket{
    clientToken  ?: string;
    auth ?: {
        name     ?:  string,
        username ?: string,
        email    ?:  string,
        iat      ?:  number, 
        exp      ?:  number
    }
}

export interface ISignBody {
    email    : string;
    password : string;
};

export interface ISignUpBody {
    fullname : string;
    email    : string;
    password : string;
    confirmPassword: string;
};

export interface TypeRequest{
    type : MessageType,
    body : any
};