import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';


const MyComponent = () => {
    const [data, setData] = useState(null);
    
    const dispatch = useDispatch();

    useEffect(() => {
        const ProjectData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/projects');
                console.log(response.data)
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        ProjectData();
    }, []);

};

export default MyComponent;
