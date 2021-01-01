// main methods (CRUD) + db connection; imports stuff from models.ts.

import * as consts from './const';

const pg = require('pg');

const client = new pg.Client(consts.conString);

async function connectToDatabase() {
    try {
        await client.connect();
        let result = await client.query('SELECT NOW() AS "theTime"');
        console.log('DB connected ', result.rows[0].theTime);
    } catch (e) {
        return e
    }
}

export {connectToDatabase}
