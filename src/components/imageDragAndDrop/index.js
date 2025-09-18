import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import './style.scss';
import { uploadImage, deleteProductImage } from '../../api/orders'; // make sure this function returns a Promise

const DragDropImage = ({ setFieldValue, values, productId = 0 }) => {
    const [files, setFiles] = useState([]);
    const hasInitialized = useRef(false);

    const getS3Image = (url) => {
        return `https://miezubucket.s3.eu-north-1.amazonaws.com/${url}`;
    };

const onDrop = useCallback((acceptedFiles) => {
    const filePreviews = acceptedFiles.map((file) => ({
        id: `${file.name}-${file.size}-${file.lastModified}-${Math.random()}`,
        name: file.name,
        preview: URL.createObjectURL(file),
        file,
        existing: false,
    }));

    // Call uploadImage for each file
    acceptedFiles.forEach(file => {
        uploadImage({
            file,
            product_id: productId || 0, // or adjust this based on your values shape
        }).then(res => {
            console.log('Uploaded:', res.data);
            // Optional: update file preview with uploaded URL if needed
        }).catch(err => {
            console.error('Upload failed:', err);
        });
    });

    setFiles(prev => {
        const updated = [...prev, ...filePreviews];
        setFieldValue('images', updated);
        return updated;
    });
}, [setFieldValue, values]);



    const removeFile = async (fileToRemove) => {
        if (fileToRemove?.imageId) {
            await deleteProductImage(fileToRemove?.imageId);
        }
        setFiles(prevFiles => {
            const updatedFiles = prevFiles.filter(f => f.id !== fileToRemove.id);
            setFieldValue('images', updatedFiles);
            if (!fileToRemove.existing && fileToRemove.preview) {
                URL.revokeObjectURL(fileToRemove.preview);
            }
            return updatedFiles;
        });
    };

    useEffect(() => {
        if (!hasInitialized.current && values?.length > 0) {
            const existingFiles = values.map((item, index) => ({
                id: `existing-${index}-${item.image_url}`,
                name: item?.image_url?.split('/')?.pop() || `existing-${index}`,
                preview: getS3Image(item.image_url),
                existing: true,
                uploadedUrl: item.image_url,
                imageId: item?.id
            }));
            setFiles(existingFiles);
            hasInitialized.current = true;
        }
    }, [values]);

    useEffect(() => {
        return () => {
            files.forEach(file => {
                if (!file.existing && file.preview) {
                    URL.revokeObjectURL(file.preview);
                }
            });
        };
    }, [files]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/png': ['.png'],
            'image/webp': ['.webp'],
        }
    });

    return (
        <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <p>Drag and Drop Images</p>

            <aside className="preview-container">
                {files.map(file => (
                    <div key={file.id} className="preview-item">
                        <img
                            src={file.preview}
                            alt={file.name}
                            className="preview-image"
                        />
                        <button
                            className="remove-button"
                            onClick={(e) => {
                                e.stopPropagation();
                                removeFile(file);
                            }}
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </aside>
        </div>
    );
};

export default DragDropImage;
