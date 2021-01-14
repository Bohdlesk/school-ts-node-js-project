interface ITeacher {
    name: string
    age: number
    experience: number
    sex: string
    subject: string
}

interface Lesson {
    day: string
    startTime: number
    subject: string
    teacherId: number
    url: string
    classroomId: number
}

interface Classroom {
    id: number
}

enum Subject {
    Biology = 'BIOLOGY',
    Math = 'MATH',
    Physics = 'PHYSICS',
    Chemistry = 'CHEMISTRY',
    English = 'ENGLISH',
    Franc = 'FRANC',
    PE = 'PE'
}