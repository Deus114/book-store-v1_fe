import { FETCH_USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS } from '../action/userAction';

const INITIAL_STATE = {
    account: {
        id: '',
        email: '',
        user: '',
        role: '',
    },
    isAuthenticated: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN_SUCCESS:
            return {
                ...state, account: {
                    id: action?.payload?.DT?._id,
                    email: action?.payload?.DT?.email,
                    user: action?.payload?.DT?.username,
                    role: action?.payload?.DT?.role,
                },
                isAuthenticated: true
            };

        case USER_LOGOUT_SUCCESS:
            return {
                ...state, account: {
                    access_token: '',
                    refresh_token: '',
                    email: '',
                    user: '',
                    image: '',
                    role: '',
                },
                isAuthenticated: false,
            };

        default: return state;
    }
};

export default userReducer;