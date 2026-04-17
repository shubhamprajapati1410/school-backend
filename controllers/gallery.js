const Gallery = require('../models/Gallery.Model');

exports.createGallery = async (req, res) => {
    try {
        const{ title, imagesUrl, date} = req.body;
        if (!title || !imagesUrl || !date) {
            return res.status(400).json({ status: 'N', error: 'All fields are required' });
        }
        const newGallery = new Gallery({
        title, 
        imagesUrl, 
        date
        });
        await newGallery.save();
       return res.status(201).json({ status: 'Y', message: 'Gallery created successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'N', error: `Internal Server Error:${error}` });
    }
};

exports.getGallerys = async (req, res) => {
try {
    const gallerys = await Gallery.find();
    if(!gallerys ||gallerys.length === 0){
        return res.status(400).json({ status: 'Y', error: 'No data found' });
    }
       
       return res.status(200).json({ status: 'Y', message: 'Success',data: gallerys});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'N', error: `Internal Server Error:${error}` });
    }
};

exports.deleteGallery = async (req, res) => {
    // Implementation for deleting a gallery
    let id = req.params.id;
    try {
    const gallery = await Gallery.findByIdAndDelete(id);
    if(!gallery){
        return res.status(400).json({ status: 'Y', error: 'No gallery found' });
    }
       return res.status(200).json({ status: 'Y', message: 'Gallery deleted successfully'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'N', error: `Internal Server Error:${error}` });
    }
};

exports.updateGallery = async (req, res) => {
    // Implementation for updating a gallery
    let id = req.params.id;
    try {
        const{ title, imagesUrl, date} = req.body;
        if (!title || !imagesUrl || !date) {
            return res.status(400).json({ status: 'N', error: 'All fields are required' });
        }
    const gallery = await Gallery.findById(id);
    if(!gallery){
        return res.status(400).json({ status: 'Y', error: 'No gallery found' });
    }

    const updatedGallery = await Gallery.findByIdAndUpdate(id, { title, imagesUrl, date });
    if(updatedGallery){  
    return res.status(201).json({ status: 'Y', message: 'Gallery updated successfully'});
    } 
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'N', error: `Internal Server Error:${error}` });
    }
};