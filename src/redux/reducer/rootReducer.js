import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import userReducer from './userReducer';
import orderReducer from './orderReducer';

const rootReducer = combineReducers({
    counter: counterReducer,
    user: userReducer,
    order: orderReducer,
});

export default rootReducer;