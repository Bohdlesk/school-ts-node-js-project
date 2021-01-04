require('dotenv').config();
const conString: string = process.env.PGHOST;
export const pghost = conString;