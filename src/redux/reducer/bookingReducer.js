
const initialValue = {
    listPhieuDatPhong: [], //Danh sách phiếu đặt phòng theo id
    listAllPhieuDatPhong: [], //Danh sách tất cả phiếu đặt phòng
}

export const BookingReducer = (state = initialValue, action) => {
    switch(action.type) {
        case 'LAY_DU_LIEU_BOOKING': {
            const data = action.payload;
            state.listAllPhieuDatPhong = data;
            return {...state};
        } break;
        case 'LAY_DU_LIEU_BOOKING_ID': {
            const data = action.payload.map(doc => ({...doc.data(), idPhieuDatPhong: doc.id}));
            state.listPhieuDatPhong = data;
            return {...state};
        } break;
        default: return state;
    }
}