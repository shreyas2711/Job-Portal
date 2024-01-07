import axios from 'axios'
import { JOB_LOAD_REQUEST, JOB_LOAD_SUCCESS,JOB_LOAD_FAIL,SET_JOBS } from "../constants/jobConstant"


export const jobLoadAction = (pageNumber, keyword = '', cat = '', location = '') => async (dispatch) => {
    dispatch({ type: JOB_LOAD_REQUEST });
    try {
        console.log('API request parameters:', pageNumber, keyword, cat, location);
      const { data } = await axios.get(`/api/jobs/show/?pageNumber=${pageNumber}&keyword=${keyword}&cat=${cat}&location=${location}`);
      console.log(data);
      dispatch({ type: JOB_LOAD_SUCCESS, payload: data });
      dispatch(setJobs(data.jobs));  // Add this line to set jobs in the Redux store
    } catch (error) {
      dispatch({
        type: JOB_LOAD_FAIL,
        payload: error.response ? error.response.data.error : 'Network error',
      });
    }
  };
  
  export const setJobs = (jobs) => {
    return {
      type: SET_JOBS,
      payload: jobs,
    };
  };
  