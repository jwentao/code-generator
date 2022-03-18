export const CORS_WHITELSIT = ['shoplineapp.com', 'localhost', '127.0.0.1', '0.0.0.0'];
export const ENV = process.env.SERVER_NODE_ENV;
const API_SEVER_PORT_MAP = {
    test: 8181,
    prod: 8182
}
export const API_SERVER_PORT = API_SEVER_PORT_MAP[ENV];

