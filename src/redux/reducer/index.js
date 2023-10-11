import { combineReducers } from "redux";
import { AccountReducer } from "./accountReducer";
import { AreaReducer } from "./areaReducer";
import { homeReducer } from "./homeReducer";
import { PhongReducer } from "./phongReducer";
import { BookingReducer } from "./bookingReducer";
import { dichVuReducer } from "./dichVuReducer";
import { danhGiaReducer } from "./danhGiaReducer";

const reducers = combineReducers({
    phong: PhongReducer,
    account: AccountReducer,
    home: homeReducer,
    area: AreaReducer,
    booking: BookingReducer,
    dichVu: dichVuReducer,
    danhGia: danhGiaReducer
})

export default reducers;