import { SAVE_ORDER, RESET_ORDER } from '../action/orderAction';

const INITIAL_STATE = {
    order: {
        content: '',
        totalQuantity: 0,
        totalPrice: 0,
        email: '',
        name: '',
        address: '',
        phone: '',
    }
};

const orderReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVE_ORDER:
            return {
                ...state, order: {
                    content: action?.payload?.content,
                    totalQuantity: action?.payload?.totalQuantity,
                    totalPrice: action?.payload?.totalPrice,
                    email: action?.payload?.email,
                    name: action?.payload?.name,
                    address: action?.payload?.address,
                    phone: action?.payload?.phone,
                }
            };

        case RESET_ORDER:
            return {
                ...state, order: {
                    content: '',
                    totalQuantity: 0,
                    totalPrice: 0,
                    email: '',
                    name: '',
                    address: '',
                    phone: '',
                }
            };

        default: return state;
    }
};

export default orderReducer;