const Contact = require('../models/Contact.Model');

exports.createContact = async (req, res) => {
    try {
        const{ name, email, phone, subject, message } = req.body;
        if (!name || !email || !phone || !subject || !message) {
            return res.status(400).json({ status: 'N', error: 'All fields are required' });
        }
        const newContact = new Contact({
            name,
            email, 
            phone, 
            subject, 
            message,
        });
        await newContact.save();
       return res.status(201).json({ status: 'Y', message: 'Thank You! contact you ASAP!' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'N', error: `Internal Server Error:${error}` });
    }
};

exports.getContacts = async (req, res) => {
try {
    const contacts = await Contact.find();
    if(!contacts ||contacts.length === 0){
        return res.status(400).json({ status: 'Y', error: 'No data found' });
    }
       
       return res.status(200).json({ status: 'Y', message: 'Success',data: contacts});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'N', error: `Internal Server Error:${error}` });
    }
};

exports.deleteContact = async (req, res) => {
    // Implementation for deleting a contact
    let id = req.params.id;
    try {
    const contact = await Contact.findByIdAndDelete(id);
    if(!contact){
        return res.status(400).json({ status: 'Y', error: 'No data found' });
    }
       return res.status(200).json({ status: 'Y', message: 'Contact deleted successfully'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'N', error: `Internal Server Error:${error}` });
    }
};