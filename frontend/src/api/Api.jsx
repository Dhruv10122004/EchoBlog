import axios from 'axios';

const apiURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// Fetch all blogs or by category
export const getBlogs = async (cat) => {
  try {
    const url = cat ? `${apiURL}/blog/category/${cat}` : `${apiURL}/blog`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return { data: [] };
  }
};

export const createBlog = async (data) => {
  try {
    const response = await axios.post(`${apiURL}/blog`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating blog:', error);
    return null;
  }
};

export const getBlogById = async (id) => {
  try {
    const response = await axios.get(`${apiURL}/blog/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching blog with ID ${id}:`, error);
    return null;
  }
};

export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };

  return axios
    .post(`${apiURL}/blogimage`, formData, config)
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error uploading file:', error);
      throw error;
    });
};
