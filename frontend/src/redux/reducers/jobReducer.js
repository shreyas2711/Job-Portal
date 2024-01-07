import { JOB_LOAD_FAIL, JOB_LOAD_REQUEST, JOB_LOAD_RESET, JOB_LOAD_SUCCESS,SET_JOBS } from "../constants/jobConstant"



const initialState = {
    loading: false,
    success: false,
    page: 1,
    pages: 1,
    count: 0,
    setUniqueLocation: [],
    jobs: [],
  };
  
  export const loadJobReducer = (state = initialState, action) => {
    switch (action.type) {
      case JOB_LOAD_REQUEST:
        return { ...state, loading: true };
      case JOB_LOAD_SUCCESS:
        return {
          ...state,
          loading: false,
          success: action.payload.success,
          page: action.payload.page,
          pages: action.payload.pages,
          count: action.payload.count,
          setUniqueLocation: action.payload.setUniqueLocation,
          jobs: action.payload.jobs,
        };
      case JOB_LOAD_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case JOB_LOAD_RESET:
        return initialState;
      case SET_JOBS:
        return { ...state, jobs: action.payload };
      default:
        return state;
    }
  };
  
  
