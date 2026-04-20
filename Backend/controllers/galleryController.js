const mongose = require("mongoose");
const GALLERY = require("../models/gallery");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const USER = require("../models/user");



const getAllGalleryController = async (req, res) => {
    try {
        const getGalleryData = await GALLERY.find();
        if (getGalleryData.length === 0) {
            return res.status(404).json({ status: false, message: "Gallery data is not found !" });
        }

        return res.status(200).json({ status: true, message: "Gallery data Fetched.", galleryData: getGalleryData });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ status: false, message: "Failed to Fetch the Gallery Data !", error: error.message });
    }
}






const createGallery = async (req, res) => {
    const { title, description, pdfUrl } = req.body;
    const galleryImage = req.file;
    const _id = req.user._id.toString();

    if (!title || !description || !pdfUrl) {
        return res.status(400).json({ status: false, message: "All Fields are must filled." });
    }

    try {

        const isPublisherAdmin = await USER.findById(_id);

        if (!isPublisherAdmin) {
            fs.unlinkSync(galleryImage.path);
            return res.status(404).json({ status: false, message: "Account Not Found." });
        }
        if (isPublisherAdmin.role !== process.env.ADMIN_STRING) {
            fs.unlinkSync(galleryImage.path);
            return res.status(400).json({ status: false, message: "You are not admin." });
        }

        // Upload to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(galleryImage.path, {
            folder: "gallery",
        });

        if (!uploadResult) { return res.status(400).json({ status: false, message: "failed to upload image" }) }

        // Delete local file after upload
        fs.unlinkSync(galleryImage.path);



        const newGallery = await GALLERY.create({ title: title, description: description, imageUrl: uploadResult.secure_url, pdfUrl: pdfUrl, uploadedBy: _id });
        if (!newGallery) {
            return res.status(400).json({ status: false, message: "Failed to create gallery" });
        }
        return res.status(201).json({ status: true, message: "Gallery created successfully", data: newGallery });

    } catch (error) {
        return res.status(500).json({ message: "Failed to create gallery", error: error.message });
    }

}




const deleteGallery = async (req, res) => {
    const { _id } = req.params;
    const userId = req.user._id.toString();
    try {
        const isAdmin = await USER.findById({_id:userId});

        if (!isAdmin) {
            return res.status(404).json({ status: false, message: "Account Not Found." });
        }
        if (isAdmin.role !== process.env.ADMIN_STRING) {
            return res.status(400).json({ status: false, message: "You are not admin." });
        }



        const deletedGallery = await GALLERY.findByIdAndDelete(_id);
        
        if (!deletedGallery) {
            return res.status(404).json({ status: false, message: "Gallery Not Found." });
        }
        return res.status(204).json({status:true,message:"Gallery Deleted Successfully."});
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Failed to delete gallery", error: error.message });
    }
}
module.exports = {
    getAllGalleryController,
    createGallery,
    deleteGallery
}