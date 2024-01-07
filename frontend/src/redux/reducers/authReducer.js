import {
    USER_SIGNIN_SUCCESS
} from "../constants/userConstant"

const initialState = {
    isAuthenticated:false
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_SIGNIN_SUCCESS:
            return{
                isAuthenticated:true
            };
            default:
                return state;
        }
    };
          
