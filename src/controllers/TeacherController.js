const {v4: uuid} = require('uuid');
const path = require('path');
const fsPromises = require('fs/promises');
const TeachersDb = {
    teachers: require('../db/teachers.json'),
    setTeachers: function(data){
        this.teachers = data
    }
}



const GetTeachers = (req,res)=>{
    res.json(TeachersDb.teachers)
}

const AddTeacher  = async (req,res)=>{
    const   {
        name,
        employmentDate,
        Qualification,
        SubjectTaught,
    } = req.body

    if(!name || !employmentDate ||! Qualification || SubjectTaught == []) return res.status(401).json({message:"All fields are required"});

    const existingTeacher  = TeachersDb.teachers.find(teacher => {
        teacher.name == name && teacher.employmentDate == employmentDate && teacher.Qualification == Qualification
    })

    if(existingTeacher) return res.status(409).json({message:"Teacher exists"});

    const newTeacher = {
        _id: `${uuid()}`,
        name: req.body.name,
        employmentDate: employmentDate,
        Qualification: Qualification,
        SubjectTaught: SubjectTaught
    }

    try {
        TeachersDb.setTeachers([...TeachersDb.teachers,newTeacher])

        await fsPromises.writeFile(
            path.join(__dirname,'..','db','teachers.json'),
            JSON.stringify(TeachersDb.teachers)
        )
        
        res.status(200).json({message:"Teacher Added"})
    } catch (error) {
        console.log(error)
    }
}


//edit teacher controller
async function EditTeacher(req, res){
    const   {
        _id,
        name,
        employmentDate,
        Qualification,
        SubjectTaught,
    } = req.body ;


    //find the teacher to bbe edited
    let existingTeacher = TeachersDb.teachers.find(teacher => teacher._id == req.body._id)

    existingTeacher = req.body

    const uneditedTeachers = TeachersDb.teachers.filter(teacher => teacher._id != req.body._id)

    try {
        TeachersDb.setTeachers([...uneditedTeachers,existingTeacher])

        await fsPromises.writeFile(
            path.join(__dirname,'..','db','teachers.json'),
            JSON.stringify(TeachersDb.teachers)
        )
        
        res.status(200).json({message:"Teacher Edited"})

    } catch (error) {
        console.log(error)
    }


}


module.exports = {GetTeachers,AddTeacher,EditTeacher}