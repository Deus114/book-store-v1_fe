import { FETCH_USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS } from '../action/userAction';

const INITIAL_STATE = {
    account: {
        id: '',
        email: '',
        user: '',
        role: '',
        phone: '',
        address: '',
        password: ''
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
                    phone: action?.payload?.DT?.phone,
                    address: action?.payload?.DT?.address,
                    password: action?.payload?.DT?.password,
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