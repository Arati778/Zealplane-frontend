import React, { useRef, useState, useEffect } from 'react';
import { Card, IconButton } from '@mui/material';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';
import "./style.scss";
import ContentWrapper from '../../../../../components/contentWrapper/ContentWrapper';
import Img from '../../../../../components/lazyLoadImage/Img';
import DetailsPage from '../DetailsPage/DetailsPage';

const AddProject = () => {
    const fileInputRef = useRef(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
    const [imageLinks, setImageLinks] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const userId = localStorage.getItem('username');
                const response = await axios.get(`https://thezealplane-6dsp3b2ixq-uc.a.run.app/getAllProject`);
                setImageLinks(response.data); // Assuming response.data is an array of image URLs
            } catch (error) {
                console.error('Error fetching images from backend:', error);
            }
        };

        fetchImages();
    }, []);

    const handleAddImage = async (file) => {
        try {
            const formData = new FormData();
            formData.append('image', file);
    
            const cloudinaryResponse = await axios.post('https://thezealplane-6dsp3b2ixq-uc.a.run.app/cloudinary', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            console.log('Image uploaded to Cloudinary successfully:', cloudinaryResponse.data);
            setUploadedImageUrl(cloudinaryResponse.data[0].secure_url); // Log the uploaded image URL
    
            const payload = {
                userId: localStorage.getItem('username'),
                projectId: "49fa8fef-8794-4a07-a861-b443f533079e",
                publicId: {
                    publicId1: cloudinaryResponse.data[0].public_id
                },
                imageLink: {
                    publicId1: cloudinaryResponse.data[0].secure_url
                },
                createdDate: {
                    publicId1: cloudinaryResponse.data[0].created_at
                },
                projectCount: 5,
                visibility: {
                    publicId1: false
                },
                description: {
                    publicId1: "descValue1",
                    publicId2: "descValue2"
                },
                projectNumberOfUser: 1
            };
    
            await axios.post('https://thezealplane-6dsp3b2ixq-uc.a.run.app/createProject', payload);
            setImageLinks((prev) => [...prev, cloudinaryResponse.data[0].secure_url]);
            console.log('Uploaded Image URL:', cloudinaryResponse.data[0].secure_url);
        } catch (error) {
            console.error('Error uploading image to Cloudinary:', error);
        }
    };
    
    const handleCardClick = () => {
        fileInputRef.current.click(); 
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleAddImage(file);
        }
    };

    return (
        <div className='addProject'>
            <ContentWrapper>
                <h3 className='addProjectTitle'>Add More Images</h3>
                <div className='addProjectContainer' style={{ display: 'flex', flexWrap: 'wrap' }}>
                    <div className='cardContainer' style={{ margin: '5px', width: '200px' }}>
                        <Card className="addProjectCard" onClick={handleCardClick}>
                            <IconButton className="addIconButton">
                                <FaPlus />
                            </IconButton>
                        </Card>
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    <div className='existingImages' style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {imageLinks.map((link, index) => (
                            <div key={index} className='imageCard' style={{ margin: '5px', width: '200px' }}>
                                <Img src={link} alt={`Project Image ${index}`} className='ProjectImage' style={{ width: '100%', height: '200px' }} />
                            </div>
                        ))}
                    </div>
                </div>
            </ContentWrapper>
            
        </div>
    );
};

export default AddProject;
