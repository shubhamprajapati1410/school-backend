const Notice = require('../models/Notice.Model');

exports.createNotice= async (req, res) => {
    try {
        const{ title, description, date, category} = req.body;
        if (!title || !description || !date || !category) {
            return res.status(400).json({ status: 'N', error: 'All fields are required' });
        }
        const newNotice = new Notice({
        title, 
        description, 
        date,
        category
        });
        await newNotice.save();
       return res.status(201).json({ status: 'Y', message: 'Notice created successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'N', error: `Internal Server Error:${error}` });
    }
};

exports.getNotices = async (req, res) => {
try {
    const notices = await Notice.find();
    if(!notices ||notices.length === 0){
        return res.status(400).json({ status: 'Y', error: 'No data found' });
    }
       
       return res.status(200).json({ status: 'Y', message: 'Success',data: notices});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'N', error: `Internal Server Error:${error}` });
    }
};

exports.deleteNotice = async (req, res) => {
    // Implementation for deleting a notice
    let id = req.params.id;
    try {
    const notice = await Notice.findByIdAndDelete(id);
    if(!notice){
        return res.status(400).json({ status: 'Y', error: 'No notice found' });
    }
       return res.status(200).json({ status: 'Y', message: 'Notice deleted successfully'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'N', error: `Internal Server Error:${error}` });
    }
};

exports.updateNotice = async (req, res) => {
    // Implementation for updating a notice
    let id = req.params.id;
    try {
        const{ title, description, date, category} = req.body;
        if (!title || !description || !date || !category) {
            return res.status(400).json({ status: 'N', error: 'All fields are required' });
        }
    const notice = await Notice.findById(id);
    if(!notice){
        return res.status(400).json({ status: 'Y', error: 'No notice found' });
    }

    const updatedNotice = await Notice.findByIdAndUpdate(id, { title, description, date, category });
    if(updatedNotice){  
    return res.status(201).json({ status: 'Y', message: 'Notice updated successfully'});
    } 
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'N', error: `Internal Server Error:${error}` });
    }
};