import React, { useState,useEffect } from 'react';
import './CreateJobPost.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';

const JobPost = (isAuth) => {
  // State to store form data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    salary: '',
    location: '',
    jobType: '',
    companywebsite: '',
    experience: '',
    batch: '',
    jobdescription: '',
    keyresp: '',
    requiredskill: '',
    thumbnail:'',
    date:''
  });

  const [authToken, setAuthToken] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setAuthToken(storedToken);
    } else {
      console.error('Authentication token not found.');
      // You might want to redirect the user to the login page or handle this case appropriately.
    }
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts.

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!authToken) {
      console.error('Authentication token not set.');
      return;
    }

    console.log('Authorization header:', `Bearer ${authToken}`);

    try {
      const response = await axios.post('/api/job/create', formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
  },);
  
  

  return (
    <>
    <Navbar/>
    <div className='createpost-body'>
      <h2>Create Job Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description"  cols="30"
            rows="10" value={formData.description} onChange={handleInputChange}  />
        </div>

        <div>
          <label htmlFor="salary">Salary:</label>
          <input type="text" id="salary" name="salary" value={formData.salary} onChange={handleInputChange} />
        </div>

        <div>
          <label htmlFor="location">Location:</label>
          <input type="text" id="location" name="location" value={formData.location} onChange={handleInputChange} />
        </div>

        <div>
          <label htmlFor="jobtype">Job Type:</label>
          <input type="text" id="jobType" name="jobType" value={formData.jobType} onChange={handleInputChange} />
        </div>


        <div>
        
          <label htmlFor="companywebsite">Company Website:</label>
          <input type="text" id="companywebsite" name="companywebsite" value={formData.companywebsite} onChange={handleInputChange} />
        </div>

        {/* <div>
          <label htmlFor="jobRole">Job Role:</label>
          <input type="text" id="jobRole" name="jobRole" value={formData.jobRole} onChange={handleInputChange} />
        </div> */}

        <div>
          <label htmlFor="experience">Experience:</label>
          <input type="text" id="experience" name="experience" value={formData.experience} onChange={handleInputChange} />
        </div>

        <div>
          <label htmlFor="batch">Batch:</label>
          <input type="text" id="batch" name="batch" value={formData.batch} onChange={handleInputChange} />
        </div>

        {/* <div>
          <label htmlFor="lastDate">Last Date:</label>
          <input type="text" id="lastDate" name="lastDate" value={formData.lastDate} onChange={handleInputChange} />
        </div> */}

        <div>
          <label htmlFor="jobdescription">Job Description:</label>
          <textarea id="jobdescription" name="jobdescription"  cols="30"
            rows="10" value={formData.jobdescription} onChange={handleInputChange}  />
        </div>

        <div>
          <label htmlFor="keyResponsibilities">Key Responsibilities:</label>
          <textarea id="keyResponsibilities"  cols="30"
            rows="10" name="keyresp" value={formData.keyresp} onChange={handleInputChange} />
        </div>

        <div>
          <label htmlFor="requiredskill">Required Skills:</label>
          <textarea id="requiredskill"  cols="30"
            rows="10" name="requiredskill" value={formData.requiredskill} onChange={handleInputChange} />
        </div>
        
        <div>
          <label htmlFor="experience">Thumbnail</label>
          <input type="text" id="thumbnail" name="thumbnail" value={formData.thumbnail} onChange={handleInputChange} />
        </div>

        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
    <Footer/>
    </>
  );
};

export default JobPost;
