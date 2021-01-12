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
        .query(`SELECT name
                FROM lesson
                         INNER JOIN
                     teacher
                     ON teacher_id = id
                WHERE (
                              LOWER(subject) = 'math'
                              AND
                              start_time >= 8.5 and start_time <= 14.5
                              AND
                              LOWER(day) = 'thursday'
                              AND
                              classroom_id = 100
                          )`)
}


function readDataFromLessonDB() {
    return client
        .query('SELECT * FROM "public"."lesson"');
}

function addDataIntoTeacherDB(name: string, age: number, experience: number, sex: string, subject: string) {
    return client
        .query(`INSERT INTO "public"."teacher" (name, age, experience, sex, subject)
                values ($1, $2, $3, $4, $5)`,
            [name, age, experience, sex, subject]);
}

function addDataIntoLessonDB(day: string, start_time: number, teacher_id: number, zoom_url: string, classroom_id: number) {
    return client
        .query(`INSERT INTO "public"."lesson" (day, start_time, teacher_id, zoom_url, classroom_id)
                values ($1, $2, $3, $4, $5)`,
            [day, start_time, teacher_id, zoom_url, classroom_id]);
}

function updateTeacherDB(id: number, name: string, age: number, experience: number, sex: string, subject: string) {
    return client
        .query(`UPDATE "public"."teacher"
                SET name       = $2,
                    age        = $3,
                    experience = $4,
                    sex        = $5,
                    subject    = $6
                WHERE id = $1`,
            [id, name, age, experience, sex, subject]);
}

function updateLessonDB(id: number, day: string, start_time: number, teacher_id: number,
                        zoom_url: string, classroom_id: number) {
    return client
        .query(`UPDATE "public"."lesson"
                SET day          = $2,
                    start_time   = $3,
                    teacher_id   = $4,
                    zoom_url     = $5,
                    classroom_id = $6
                WHERE lesson_id = $1`,
            [id, day, start_time, teacher_id, zoom_url, classroom_id]);
}

function deleteFromTeacherDB(id: number) {
    return client
        .query('DELETE FROM "public"."teacher" WHERE id = $1', [id]);
}

function deleteFromLessonDB(id: number) {
    return client
        .query('DELETE FROM "public"."lesson" WHERE id = $1', [id]);
}

// function test(day: string, time: number, t_id: number) {
//     return client
//         .query('INSERT INTO "public"."lesson" (day, start_time, teacher_id) values ($1, $2, $3)',
//             [day, time, t_id]);
// }

export {
    connectToDatabase, readDataFromTeacherDB, getTargetMathTeachers, addDataIntoTeacherDB,
    updateTeacherDB
}
