const express = require('express');
import * as bodyParser from 'body-parser';

import {
    connectToDatabase, readDataFromTeacherDB, getTargetMathTeachers, addDataIntoTeacherDB,
    updateTeacherDB, deleteFromTeacherDB
} from "./db";


connectToDatabase()
.then(() => {
    return readDataFromTeacherDB()
})
.then((data) => {
    console.log(data.rows);
    return getTargetMathTeachers()
})
.then(data => {
    console.log(data.rows);
})
.catch(err => {
    console.error('Error: ', err)
})

const app = express();
app.use(bodyParser.json())

app.get('/school/teachers', (req, res) => {
    let sortParam: string = ""

    if (req.query.age || req.query.sex || req.query.yearsOfExperience) {
        if (req.query.age) {
            sortParam += ` WHERE age = ${req.query.age}`
        }
        if (req.query.sex) {
            sortParam += ` AND sex = '${req.query.sex}'`
        }
        if (req.query.yearsOfExperience) {
            sortParam += ` AND experience = ${req.query.yearsOfExperience}`
        }
    }

    readDataFromTeacherDB(sortParam)
        .then(data => {
            res.status(200).send({
                status: 'success',
                data: data.rows
            })
        })
        .catch(err => {
            res.status(404).send({
                stats: 'error'
            })
        })
});

app.post('/school/teachers', (req, res) => {
    addDataIntoTeacherDB(req.body.name, req.body.age, req.body.experience,
        req.body.sex, req.body.subject)
        .then(res.status(200).send({
            status: 'success',
        }))
        .catch(err => {
            res.status(404).send({
                stats: 'error'
            })
        })
});

app.delete('/school/teachers/:id', (req, res) => {

    deleteFromTeacherDB(req.params.id)
        .then(
            res.status(200).send(
                {
                    status: 'success',
                })
        )
        .catch(err => {
            res.status(404).send(
                {
                    stats: 'error'
                })
        })
});

app.put('/school/teachers/:id', (req, res) => {
    const id: number = req.params.id;
    updateTeacherDB(id, req.body.name, req.body.age, req.body.experience,
        req.body.sex, req.body.subject)
        .then(res.status(200).send({
            status: 'success',
        }))
        .then(data=>{
            console.log(data);})
        .catch(err => {
            res.status(404).send({
                stats: 'error'
            })
        })
})

const port = process.env.PORT || 80;
app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}...`);
});