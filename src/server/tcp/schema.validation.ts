import Joi from "joi";
import { v4 } from "uuid";

export const SchemaValidation = Joi.object({

    type: Joi.string().valid("auth", "sign-in", "sign-up", "ping").required(),
    
    body: Joi.object({

        ping: Joi.when("type", {
            is: ["ping"],
            then: Joi.string().required(),
            otherwise : Joi.forbidden(),
        }),

        username : Joi.when("type", {
            is: ["sign-up"],
            then: Joi.string().required(),
            otherwise: Joi.forbidden()
        }),

        name : Joi.when("type", {
            is: ["sign-up", "sign-in"],
            then: Joi.string().required(),
            otherwise: Joi.forbidden()
        }),

        email : Joi.when("sign-up", {
            is: ["sign-up", "sign-in"],
            then: Joi.string().required().email({ tlds: {allow: ['com', "yahoo", "id"]}}),
            otherwise: Joi.forbidden()
        }),

        password : Joi.when("type", {
            is: ["sign-up", "sign-in"],
            then: Joi.string().required(),
            otherwise: Joi.forbidden()
        }),

        confirm_password : Joi.when("type", {
            is: ["sign-up"],
            then: Joi.ref("password"),
            otherwise: Joi.forbidden()
        }),
    }),

    token_request : Joi.string().default(v4()),
    created_at : Joi.number().default(Date.now()),
    
}).with("password", "confirm_password")