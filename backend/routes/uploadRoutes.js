import "dotenv/config";

import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

const router = express.Router();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const storage = multer.memoryStorage();

const upload = multer({
    storage
});
router.post("/", upload.single("image"), async (req, res) => {

    try {

        // Check file
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }
        const streamUpload = (buffer) => {

            return new Promise((resolve, reject) => {

                const stream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: "image"
                    },
                    (error, result) => {
                        if (error) {
                        
                            reject(error);
                            return;
                        }
                        resolve(result);
                    }
                );

                streamifier
                    .createReadStream(buffer)
                    .pipe(stream);
            });
        };


        // Upload image
        const result = await streamUpload(req.file.buffer);
        console.log("IMAGE URL:", result.secure_url);
        return res.status(200).json({
            success: true,
            imageUrl: result.secure_url
        });

    } catch (error) {
        // console.log("UPLOAD ERROR:", error);
        return res.status(500).json({
            success: false,
            message: error?.message || "Image upload failed"
        });
    }
});


export default router;
