import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../../firebase/firebase.config";
import { setLoading } from "./homeAction";

// Lay du lieu danh gia tat cat
export const layDuLieuDanhGia = () => async (dispatch) => {
    try {
        const dannhGiaRef = collection(db, 'danhGia');
        const danhGiaDoc = await getDocs(dannhGiaRef)
        return danhGiaDoc.docs.map((doc)=>({...doc.data(),id: doc.id}));
    } catch (err) {
        return false;
    }
}

// Lấy dữ liệu đánh giá theo ID
export const layDuLieuDanhGiaPhong = (id) => async (dispatch) => {
    try {
        const dannhGiaRef = collection(db, 'danhGia');
        const danhGiaQuery = query(dannhGiaRef, where('idPhong', '==', id));
        const danhGiaResult = await  getDocs(danhGiaQuery);
        return danhGiaResult.docs.map((doc)=>({...doc.data(),id: doc.id}));
    } catch (err) {
        return false;
    }
}

// Tạo đánh gía 
export const createDanhGia = (data) => async (dispatch) => {
    try {
        dispatch(setLoading({
            status: 'isLoading'
        }));
        setTimeout(async()=> {
            await addDoc(collection(db, 'danhGia'), {...data, createAt: serverTimestamp(), idKhacHang: JSON.parse(localStorage.getItem('jwt')), infoKhachHang: JSON.parse(localStorage.getItem('userLogin'))});
            dispatch(setLoading({
                status: 'done'
            }));
            Swal.fire({
                icon: 'success',
                title: 'Đánh giá thành công !',
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true
            }).finally(()=> { return true; })
        }, 500) 
    } catch (err) {
        return false;
    }
}