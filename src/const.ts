require('dotenv').config({path: '../.env'});
const conString: string = process.env.PGHOST;
export const pghost = conString;