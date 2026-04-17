const Teacher = require('../models/Teacher.Model');
const Notice = require('../models/Teacher.Model');

exports.createTeacher= async (req, res) => {
    try {
        const{ name, subject, designation, bio ,image} = req.body;
        if (!name || !subject || !designation || !bio || !image) {
            return res.status(400).json({ status: 'N', error: 'All fields are required' });
        }
        const newTeacher = new Teacher({
        name, 
        subject,
        designation,
        bio,
        image
        });
        await newTeacher.save();
       return res.status(201).json({ status: 'Y', message: 'Teacher created successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'N', error: `Internal Server Error:${error}` });
    }
};

exports.getTeachers = async (req, res) => {
try {
    const teachers = await Teacher.find();
    if(!teachers ||teachers.length === 0){
        return res.status(400).json({ status: 'Y', error: 'No data found' });
    }
       
       return res.status(200).json({ status: 'Y', message: 'Success',data: teachers});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'N', error: `Internal Server Error:${error}` });
    }
};

exports.deleteTeacher = async (req, res) => {
    // Implementation for deleting a teacher
    let id = req.params.id;
    try {
    const teacher = await Teacher.findByIdAndDelete(id);
    if(!teacher){
        return res.status(400).json({ status: 'Y', error: 'No teacher found' });
    }
       return res.status(200).json({ status: 'Y', message: 'Teacher deleted successfully'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'N', error: `Internal Server Error:${error}` });
    }
};

exports.updateTeacher = async (req, res) => {
    // Implementation for updating a teacher
    let id = req.params.id;
    try {
        const{ name, subject, designation, bio ,image} = req.body;
        if (!name || !subject || !designation || !bio || !image) {
            return res.status(400).json({ status: 'N', error: 'All fields are required' });
        }
    const teacher = await Teacher.findById(id);
    if(!teacher){
        return res.status(400).json({ status: 'Y', error: 'No teacher found' });
    }

    const updatedTeacher = await Teacher.findByIdAndUpdate(id, { name, subject, designation, bio, image });
    if(updatedTeacher){  
    return res.status(201).json({ status: 'Y', message: 'Teacher updated successfully'});
    } 
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'N', error: `Internal Server Error:${error}` });
    }
};