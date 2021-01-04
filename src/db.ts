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


function readDataFromTeacherDB(): Promise<QueryResult<any>> {
    return client
        .query('SELECT * FROM "public"."teacher"')
}


function getTargetMathTeachers() {
    return client
        .query('SELECT\n' +
            '    day\n' +
            '    lesson_id,\n' +
            '    id,\n' +
            '    teacher_id,\n' +
            '    lesson.subject,\n' +
            '    name\n' +
            'FROM\n' +
            '    lesson\n' +
            '        INNER JOIN teacher\n' +
            '                   ON teacher_id = id\n' +
            'WHERE(\n' +
            '                 LOWER(lesson.subject ) = \'math\'\n' +
            '             AND\n' +
            '                 start_time >= 8.5 and start_time <= 14.5\n' +
            '             AND\n' +
            '                 LOWER ( day ) = \'wednesday\'\n' +
            '         )')
}

export {connectToDatabase, readDataFromTeacherDB, getTargetMathTeachers}
