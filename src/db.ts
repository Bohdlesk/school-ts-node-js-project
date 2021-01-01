import {QueryResult} from "pg";

const pg = require('pg');
import * as constants from './const'

const client = new pg.Client(constants.pghost);

function connectToDatabase() {
    return client.connect()
        .then(() => {
            return client
                .query('SELECT NOW() AS "theTime"')
        })
        .then((data): void => {
            console.log('DB connected ', data.rows[0].theTime);
        })
        .catch(err => {
            console.error('Error: ', err)
        })
}

export {connectToDatabase}
