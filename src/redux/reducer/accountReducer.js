import { useNavigate } from "react-router-dom";

const initialState = {
    userInfo: {},
    adminInfo: {},
    statusLogin: false,
    statusLoginAdmin: false,
    listUser: [],
}

export const AccountReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'DANG_NHAP_USER': {
            if(action.payload.data[0]) {
                state.userInfo = action.payload.data[0];
                state.statusLogin = true;
                // Tạo biến trên localStorage
                localStorage.setItem("jwt", JSON.stringify(action.payload.data[0].id));
                localStorage.setItem("userLogin", JSON.stringify({userName: action.payload.data[0].userName, email: action.payload.data[0].email}));
                // Chuyển hướng về trang user
                window.location.replace('/user');
                // tương ứng navigate 
            } else {
                state.statusLogin = false;
            }
            return {...state};
        }
        break;
        case 'DANG_NHAP_ADMIN': {
            if(action.payload.data[0]) {
                state.adminInfo = action.payload.data[0];
                state.statusLoginAdmin = true;
                localStorage.setItem("jwtAdmin", JSON.stringify(action.payload.data[0].id));
                window.location.replace('/admin');
            } else {
                state.statusLoginAdmin = false;
            }
            return {...state};
        }
        break;
        case 'LAY_DU_LIEU_USER': {
            state.userInfo = action.payload;
            return {...state};
        } 
        break;
        case 'LAY_DU_LIEU_USER_ALL': {
            const data = action.payload.docs.map((item)=> ({...item.data(), id: item.id}));
            state.listUser = data;
            return {...state};
        }
        break;
        default: return state;
    }
}