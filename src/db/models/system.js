import { SYSTEM_COLLECTION } from '../collections';
import logger from '../../logger';

const SYSTEM_INFO_ENTRY_ID = 1;
/**
 * Get system info object
 * @param {Db} database
 * @return {System.Info | null}
 */
export const getSystemObject = async (database) => {
    const collection = database.collection(SYSTEM_COLLECTION);
    return (await collection
        .find({ _id: SYSTEM_INFO_ENTRY_ID })
        .toArray()).pop();
};

/**
 * Update the system info object in DB
 * @param {Db} database
 * @param {Partial<System.Info>} delta
 * @return {Promise<void>}
 */
const updateSystemObject = async (database, delta) => {
    const collection = database.collection(SYSTEM_COLLECTION);
    await collection.updateOne(
        { _id: SYSTEM_INFO_ENTRY_ID },
        { $set: delta },
        { upsert: true }
    );
};

/**
 * Update the timestamp of the worker last run info
 * @param {Db} database
 * @param {Date} date
 * @return {Promise<void>}
 */
export const setWorkerLastRunDate = async (database, date) => {
    logger.debug(`Set worker_last_run to ${ date.toISOString() }`);
    await updateSystemObject(database, { worker_last_run: date });
};

/**
 * Set status of running worker
 * @param {Db} database
 * @param {boolean}isRunning
 * @return {Promise<void>}
 */
export const setWorkerIsRunning = async (database, isRunning) => {
    logger.debug(`Set worker_is_running to ${ isRunning }`);
    await updateSystemObject(database, { worker_is_running: isRunning });
};
