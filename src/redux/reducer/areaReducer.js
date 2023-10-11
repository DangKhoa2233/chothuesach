

const initialState = {
    listArea: {}
}

export const AreaReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'LAY_DU_LIEU_KHU_VUC': {
            state.listArea = action.payload.docs.map((doc)=> ({...doc.data()}));
            return {...state};
        }
        break;
        default: return state;
    }
}