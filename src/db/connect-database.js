import { MongoClient } from 'mongodb';
import logger from '../logger';

let _client = null;

/**
 * Connect to mongo. Recycle connection if available
 * @param {string} uri
 * @return {Promise<MongoClient>}
 */
function connect(uri) {
    if (_client) {
        return _client;
    }
    logger.debug(`Connect to mongodb ${ uri }`);
    return new Promise((resolve, reject) => {
        MongoClient.connect(uri, (err, client) => {
            if (err) {
                logger.error(err.message);
                return reject(err);
            }
            logger.debug(`Connection to mongodb established`);
            _client = client;
            return resolve(client);
        });
    });
}

/**
 * Connect to DB
 * @return {Promise<{database: Db, client: MongoClient }>}
 */
export default async function connectDatabase(uri) {
    const client = await connect(uri);
    const database = client.db();
    return { database, client };
}
