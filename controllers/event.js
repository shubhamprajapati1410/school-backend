const Event = require('../models/Event.Model');

exports.createEvent = async (req, res) => {
    try {
        const{ title, description, shortDescription, date, location} = req.body;
        if (!title || !description || !shortDescription || !date || !location) {
            return res.status(400).json({ status: 'N', error: 'All fields are required' });
        }
        const newEvent = new Event({
        title, 
        description, 
        shortDescription, 
        date,
        location
        });
        await newEvent.save();
       return res.status(201).json({ status: 'Y', message: 'Event created successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'N', error: `Internal Server Error:${error}` });
    }
};

exports.getEvents = async (req, res) => {
try {
    const events = await Event.find();
    if(!events ||events.length === 0){
        return res.status(400).json({ status: 'Y', error: 'No data found' });
    }
       
       return res.status(200).json({ status: 'Y', message: 'Success',data: events});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'N', error: `Internal Server Error:${error}` });
    }
};

exports.deleteEvent = async (req, res) => {
    // Implementation for deleting a event
    let id = req.params.id;
    try {
    const event = await Event.findByIdAndDelete(id);
    if(!event){
        return res.status(400).json({ status: 'Y', error: 'No event found' });
    }
       return res.status(200).json({ status: 'Y', message: 'Event deleted successfully'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'N', error: `Internal Server Error:${error}` });
    }
};

exports.updateEvent = async (req, res) => {
    // Implementation for updating an event
    let id = req.params.id;
    try {
        const{ title, description, shortDescription, date, location} = req.body;
        if (!title || !description || !shortDescription || !date || !location) {
            return res.status(400).json({ status: 'N', error: 'All fields are required' });
        }
    const event = await Event.findById(id);
    if(!event){
        return res.status(400).json({ status: 'Y', error: 'No event found' });
    }

    const updatedEvent = await Event.findByIdAndUpdate(id, { title, description, shortDescription, date, location });
    if(updatedEvent){  
    return res.status(201).json({ status: 'Y', message: 'Event updated successfully'});
    } 
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'N', error: `Internal Server Error:${error}` });
    }
};