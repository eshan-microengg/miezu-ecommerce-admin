import React, { useState, useEffect } from 'react';
import Icons from '../components/icons';
import { faRemove, faUpload } from '@fortawesome/free-solid-svg-icons';
import './style.scss';
import { uploadImage } from '../api/orders';

const ImageUploader = ({ onChange, imageUrl, title = "Image", imgStyle = {} }) => {
    const [media, setMedia] = useState(null); // State to hold the file preview
    const [mediaType, setMediaType] = useState(null); // State to track whether it's an image or video
    const [loading, setLoading] = useState(false); // State to track upload status

    useEffect(() => {
        if (imageUrl) {
            const s3ImageUrl = getS3Image(imageUrl);
            setMedia(s3ImageUrl);

            // Check the file type based on the URL extension
            const fileExtension = s3ImageUrl.split('.').pop().toLowerCase();
            if (['mp4', 'webm', 'ogg'].includes(fileExtension)) {
                setMediaType('video');
            } else {
                setMediaType('image');
            }
        }
    }, [imageUrl]);

    // Function to handle file upload
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setLoading(true); // Set loading to true

            try {
                if (onChange) {
                    const res = await uploadImage({ file });
                    onChange(res);
                }

                const fileType = file.type.split('/')[0];
                setMediaType(fileType); // Set media type as "image" or "video"

                const reader = new FileReader();
                reader.onloadend = () => {
                    setMedia(reader.result); // Set the preview data
                    setLoading(false); // Set loading to false after file is read
                };
                reader.readAsDataURL(file);
            } catch (error) {
                console.error("Error uploading file:", error);
                setLoading(false); // Reset loading state on error
            }
        }
    };

    // Function to remove the file
    const handleRemoveFile = () => {
        setMedia(null);
        setMediaType(null);
        if (onChange) onChange(null); // Notify parent to clear the file
    };

    return (
        <div className="image-upload-container">
            {loading ? (
                <div className="uploading-text">Uploading...</div>
            ) : media ? (
                <div className="media-wrapper">
                    {mediaType === 'image' ? (
                        <img src={media} alt="Uploaded" className="uploaded-media" style={{ width: "300px", ...imgStyle }} />
                    ) : (
                        <video src={media} controls className="uploaded-media" style={{ width: "300px" }} />
                    )}
                    <button className="removebutton1" onClick={handleRemoveFile}>
                        <Icons iconName={faRemove} />
                    </button>
                </div>
            ) : (
                <label className="upload-label">
                    <input
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    <div>
                        Upload {title} &#160; <Icons iconName={faUpload} />
                    </div>
                </label>
            )}
        </div>
    );
};

export default ImageUploader;

// Helper function to generate S3 image URL
export const getS3Image = (url) => {
    return `https://miezubucket.s3.eu-north-1.amazonaws.com/${url}`;
};
