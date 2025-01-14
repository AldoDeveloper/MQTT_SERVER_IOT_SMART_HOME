import * as Joi from 'joi';
import { v4 } from 'uuid';

export const scemaMessageWs = Joi.object({

    type: Joi.string().valid("addGroup", "joinGroup", "listGroup", "message").required(),

    message: Joi.string().required(),

    content: Joi.when('type', {
        is: ['message'],
        then: Joi.string().required(),
        otherwise: Joi.forbidden()
    }),

    groupId: Joi.when("type", {
        is: ['addGroup', "listGroup", "joinGroup", "message"],
        then: Joi.string(),
        otherwise: Joi.forbidden()
    }),

    joinIdGroup: Joi.when("type", {
        is: ['joinGroup'],
        then: Joi.string().required(),
        otherwise: Joi.forbidden()
    })
}) ;