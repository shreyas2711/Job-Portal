import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../component/Navbar';
import Footer from '../../component/Footer';
import { useParams } from 'react-router-dom';
import './LandingPage.css';
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
// import { setJobs } from '../../redux/actions/jobActions';
import { setJobs } from '../../redux/actions/jobAction';

const LandingPage = () => {
    console.log("This is landing page")
  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [jobs, setJobs] = useState([]);

  const dispatch = useDispatch();


  const { jobs, setUniqueLocation, pages } = useSelector(state => state.loadJobs);
  // const { jobs } = useSelector(state => state.jobs);
  // console.log(jobs);
 useEffect(() => {
  const fetchJobDetails = async () => {
    try {
      const response = await axios.get(`/api/job/${id}`);
      console.log('Response from backend:', response.data);
      setJobDetails(response.data);
    } catch (error) {
      console.error('Error fetching job details:', error);
      setError('Error fetching job details');
    } finally {
      setLoading(false);
    }
  };

  fetchJobDetails();
}, [id]);

useEffect(() => {
  console.log('Updated jobDetails state:', jobDetails);
}, [jobDetails]);

console.log(jobDetails);

useEffect(() => {
  const fetchJobs = async () => {
    try {
      const response = await axios.get('/api/jobs');
      dispatch(setJobs(response.data));
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  // Fetch jobs only if the jobs array is empty or if it is still loading
  if (jobs.length === 0 || loading) {
    fetchJobs();
  }
}, [dispatch, jobs, loading]);





  return (
    <>
    <div className="root">
      <Navbar />
      
      <div className="container">

      <div className="box1">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {jobDetails && (
          <>
            <div className="job-title">
              <h1>{jobDetails.job.title}</h1>
            </div>
           
            <div className="job-desc">
              <p>{jobDetails.job.description}</p>
            </div>
            <div className="thumbnail-post">
              <img style={{width:'29rem',height:'17rem'}} src={jobDetails.job.thumbnail} alt="" />
            </div>
           

           <div className="Details">
           <h2 className='sub-details'style={{marginBottom:'12px'}}>Internship/Job Details:</h2>
           <p><strong>Company Website:</strong> <a href={jobDetails.job.companywebsite} target="_blank" rel="noopener noreferrer">{jobDetails.job.companywebsite}</a></p>
           <p><strong>Salary:</strong> {jobDetails.job.salary}</p>
            <p><strong>Job Role:</strong> {jobDetails.job.title}</p>
            <p><strong>Location:</strong> {jobDetails.job.location}</p>
            {/* <p><strong>Last Date:</strong> Yet to comp</p> */}
            {/* <p>Created At: {jobDetails.job.createdAt}</p> */}
           </div>

           <div className="job-desc">
           <h2 className='sub-details' style={{ paddingLeft: "1rem" }}>Job Description</h2>
            <p>{jobDetails.job.description}</p>
           </div>

           <div className="key-resp" style={{marginTop:"2rem"}}>
  <h2 className='sub-details' style={{ paddingLeft: "1rem" }}>Key Responsibilities:</h2>
    {/* <ul className='key-resp-bullets'>
    <li>Bullet point 1</li>
    <li>Bullet point 2</li>
    <li>Bullet point 3</li>
    <li>Bullet point 4</li>
  </ul> */}
  <p className='sub-details-p'>{jobDetails.job.keyresp}</p>
</div>
<div className="req-skills" style={{marginTop:"2rem"}} >
  <h2 className='sub-details' style={{ paddingLeft: "1rem" }}>Requried Skills:</h2>
    {/* <ul className='key-resp-bullets'>
    <li>Bullet point 1</li>
    <li>Bullet point 2</li>
    <li>Bullet point 3</li>
    <li>Bullet point 4</li>
  </ul> */}
  <p className='sub-details-p'>{jobDetails.job.requiredskill}</p>
</div>

           

            
           </> 
           
        )}
        {/* box1 div ends here */}
        </div>
       
        <div className="box2">
  <h1>This is box2</h1>

  <div className="jobs">
  {jobs &&
    jobs.map((job) => (
      <Link key={job._id} to={`/job/${job._id}`}>
        <h2>{job.title}</h2>
      </Link>
    ))} 
    </div>
 </div>

      </div>
      
      <Footer />
      </div>
      
    </>
  );
};

export default LandingPage;
