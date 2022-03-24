export const CORS_WHITELSIT = ['shoplineapp.com', 'localhost', '127.0.0.1', '0.0.0.0'];
export const ENV = process.env.SERVER_NODE_ENV;
const API_SEVER_PORT_MAP = {
    dev: 8180,
    test: 8181,
    prod: 8182
}
export const API_SERVER_PORT = API_SEVER_PORT_MAP[ENV];

const path = require('path');
const root = path.join(__dirname);
const libName = 'test-lib';
const CONFIG_PATH_MAP = {
    dev: '/dist/config'
}
export const ROOT_PATH = root.replace(CONFIG_PATH_MAP[ENV], '')
export const Lib_Path = `${ROOT_PATH}/${libName}`;

