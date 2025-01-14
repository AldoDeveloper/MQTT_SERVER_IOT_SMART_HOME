
import { config } from 'dotenv';
import { join, resolve } from 'path'

const NODE_ENV = process.env.NODE_ENV || "dev.env";

const EnvConfig = () => {
    config({ path: resolve(process.cwd(), NODE_ENV) })
};

export default EnvConfig;