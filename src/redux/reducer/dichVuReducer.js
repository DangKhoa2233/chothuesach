const initialValue = {
    listDichVu: [],
    dichVuInfo: {}
}

export const dichVuReducer = (state = initialValue, action) => {
    switch(action.type) {
        case 'LAY_TAT_CA_DICH_VU': {
            state.listDichVu = action.payload;
            return {...state}
        } break;
        default: return state;
    }
}