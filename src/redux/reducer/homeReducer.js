

let initialValue = {
    statusLoading: false,
    statusConfirm: {
        status: false,
        method: () => {}
    },
}

export const homeReducer = (state = initialValue, action) => {
    switch(action.type) {
        case 'IS-LOADING': {
            const a = true;
            state.statusLoading = a
            return {...state};
        } break;
        case 'DONE-LOADING': {
            const a = false;
            state.statusLoading = a;
            return {...state.statusLoading};
        } break;
        case 'OPEN-CONFIRM': {
            console.log('action payload', action.payload);
            // const a = true;
            state.statusConfirm = {
                status: true,
                method: action.payload
            };
            // state.statusConfirm.method = action.payload;
            return {...state};
        } break;
        case 'CLOSE-CONFIRM': {
            const a = false;
            state.statusConfirm.status = a;
            state.statusConfirm.method = () => {};
            return {...state};
        } break;
        default: return state;
    }
}