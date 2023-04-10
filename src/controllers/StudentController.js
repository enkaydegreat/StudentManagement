const express = require('express'); 
const path    = require('path')
const fsPromises = require('fs/promises')
const {v4:uuid} = require('uuid');
const studentdb = {
    students: require('../db/students.json'),
    setStudents: function(data){
        this.students = data;
    }
}
const Student = require('../db/Student');

async function GetAllStudents(req,res){
    const results = await Student.find({});
    res.json(results)
}

async function EditStudent(req,res){
    const {_id,firstname,
        surname,
        dob,
        dateOfEnrollment,
        parentName,
        programme,} = req.body;

        //find student with the particular id 
        let studWithId = studentdb.students.find(student => student._id == req.body._id);
        studWithId = req.body;
      

        //the other unedited students
        const unedited = studentdb.students.filter(student => student._id != req.body._id);

        //new students array
        const updatedStudents = [...unedited,studWithId];

        //update the student database.
        studentdb.setStudents(updatedStudents);

        try {
            await fsPromises.writeFile(
                path.join(__dirname,'..','db','students.json'),
                JSON.stringify(studentdb.students)
            )
            res.json(studentdb.students)
            // res.status(200).json({"message": "Student  Edited"});
            
        } catch (error) {
            console.log(error.message);
        }




}


async function AddStudent(req,res){
    const {
        firstname,
        surname,
        dob,
        dateOfEnrollment,
        parentName,
        programme,
    } = req.body;


    if(!firstname ||!surname ||!dob ||!dateOfEnrollment ||!parentName ||!programme) return res.status(401).json({message: "All fields are required"});

    const existingStudent =await Student.findOne({firstname: req.body.firstname, lastname: req.body.lastname}).exec();

    if(existingStudent) return res.status(409).json({message: "This student already exists"})

    const newStudent = {
        firstname: req.body.firstname,
        surname:req.body.surname,
        dob: req.body.dob,
        dateOfEnrollment: req.body.dateOfEnrollment,
        parentName: req.body.parentName,
        programme: req.body.programme,
    }

    try {
        //adding this new student to the student db
        const result = await Student.create(newStudent);
        console.log(result)
        res.status(200).json({"message": "Student  Added"});

        
    } catch (error) {
        console.log(error)
    }


}

module.exports = {AddStudent,GetAllStudents,EditStudent};