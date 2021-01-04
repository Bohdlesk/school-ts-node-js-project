import {connectToDatabase, readDataFromTeacherDB, getTargetMathTeachers} from "./db";

connectToDatabase()
    .then(() => {
        return readDataFromTeacherDB()
    })
    .then((data) => {
        console.log(data.rows[0]);
    })
    .then(()=>{
        return getTargetMathTeachers()
    })
    .then((data)=>{
        console.log(data.rows)
    })
    .catch(err => {
        console.error('Error: ', err)
    })
