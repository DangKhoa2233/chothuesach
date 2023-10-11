

const initialState = {
    listRoom: [],
    // roomInfo: {}
}

export const PhongReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'LAY_DU_LIEU': {
            state.listRoom = action.payload.docs.map((doc)=>({...doc.data(), id: doc.id}));
            return {...state};
        }
        break;
        // case 'LAY_DU_LIEU_PHONG_INFO': {
        //     const result = action.payload[0].data();
        //     state.roomInfo = result;
        //     return {...state};
        // }
        // break;
        default: return state;
    }
}