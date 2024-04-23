export const SAVE_ORDER = 'SAVE_ORDER';
export const RESET_ORDER = 'RESET_ORDER';

export const doOrder = (data) => {
    return {
        type: SAVE_ORDER,
        payload: data
    }
}

export const doResetOrder = () => {
    return {
        type: RESET_ORDER,
    }
}