import { useEffect, useState } from 'react';
import axios from 'axios';

const useGetData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const saveDataToLocalStorage = (data) => {
    localStorage.setItem('submittedData', JSON.stringify(data));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        console.log('Response:', response.data); // Log the response data
        setData(response.data.content instanceof Array ? response.data.content : []);
        saveDataToLocalStorage(response.data.content instanceof Array ? response.data.content : []);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  let message = '';
  if (loading) {
    message = 'Loading...';
  } else if (error) {
    message = 'Oops! Something went wrong. Please try again.';
  } else if (data.length === 0) {
    message = 'No projects to display.';
  }

  return { data, loading, error, message };
};

export default useGetData;
