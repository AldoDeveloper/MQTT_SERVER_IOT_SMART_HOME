
import express from 'express';

const route = express.Router();

route.use(express.json({limit: '50mb'}));

route.get("/", async(req, res, next) => {

})

export default route;
