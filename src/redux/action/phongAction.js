import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where, and, or } from "firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../../firebase/firebase.config";
import { setLoading } from "./homeAction";

export const layDuLieuPhong = () => async (dispatch) => {
    try {
        dispatch(setLoading({
            status: 'isLoading',
        }))
        const phongRef = collection(db, 'Phong');
        const result = await getDocs(phongRef);
        setTimeout(()=> {
            dispatch(setLoading({
                status: 'done',
            }))
            dispatch({
                type: 'LAY_DU_LIEU',
                payload: result
            })
        }, 500)
    } catch(error) {
        console.log(error);
    }
}

// Search phòng
export const layDuLieuPhongTheoParams = (data) => {
    return async (dispatch) => {
        const phongRef = collection(db, 'Phong');
        const loaiPhongRef = collection(db, 'loaiPhong');
        const result = await getDocs(phongRef);
        console.log('data', data)
        let dataResult = [];
        if(data.soNguoiPar === "" && data.priceFromPar === "" && data.priceToPar === "" && data.soGiuongPar === "") {
            return dataResult = result.docs.map((doc)=>({...doc.data(), id: doc.id}));
        }  else {
            // Tìm kiếm phòng bằng câu lệnh query 
            const loaiPhongQuery = query(loaiPhongRef,
                            where('giaThueNgay', '>=', parseInt(data.priceFromPar)),
                            where('giaThueNgay', '<=', parseInt(data.priceToPar)),
                            where('soNguoi', '==', parseInt(data.soNguoiPar)), 
                            where('noiThat.soGiuong', '==', parseInt(data.soGiuongPar)))
            const loaiPhongResult = await getDocs(loaiPhongQuery);
            const resulta = loaiPhongResult.docs.map((doc)=>({...doc.data(),id: doc.id}));

            // Trường hợp tìm thấy phòng
            if(resulta.length > 0) {
                const phongQuery = query(phongRef, where('loaiPhong', '==', resulta[0].loai));
                // Giải mã
                const phongResult = await  getDocs(phongQuery);
                // Trả ra số phòng tìm thấy
                return phongResult.docs.map((doc)=>({...doc.data(),id: doc.id}));
            } 
        }
    }
}

// Lấy dữ liệu info phòng
export const layDuLieuPhongInfo = async (id) => {
    try {
        const phongRef = collection(db, 'Phong');
        const result = await getDocs(phongRef);
        // Lọc thông tin phòng theo id 
        const data = result.docs.filter((item)=> 
            item.id === id
        )
        // Nếu có dữ liệu phòng
        if(data) {
            return data[0].data();
        }
        else {
            return [];
        }
    } catch(error) {
        console.log('Lỗi rồi !');
    }
}


// Lấy dữ liệu phòng từ phiếu đặt phòng
export const getInfoRoomFormBooking = (data) => async (dispatch) => {
    try {
        const phongRef = collection(db, 'Phong');
        const result = await getDocs(phongRef);
        
    } catch (error) {
        console.log(error);
    }
}


// Lấy số lượng phòng của phòng theo id 
export const getSoLuongPhong = (data) => async (dispatch) => {
    try {
        const phongRef = doc(db, 'Phong', data);
        const result = await getDoc(phongRef);
        return result.data().soLuongPhong;
    } catch (error) {
        console.log(error);
    }
} 

// Lấy thông tin loại phòng
export const getThongTinLoaiPhong = (loaiPhong) => async (dispatch) => {
    try {
        const loaiPhongRef = collection(db, 'loaiPhong');
        const loaiPhongQuery = query(loaiPhongRef, where('loai', '==', loaiPhong));
        const loaiPhongDoc = await getDocs(loaiPhongQuery);
        return loaiPhongDoc.docs[0].data();
    } catch (error) {
        console.log(error);
    }
} 


// Tạo mới phòng
export const createRoom = (data) => async (dispatch) => {
    try {
        dispatch(setLoading({
            status: 'isLoading'
        }));
        // const phongRef = collection(db, 'Phong');
        // const result = await getDocs(phongRef);
        setTimeout(async()=> {
            await addDoc(collection(db, 'Phong'), {...data.data, danhGia: []});
            dispatch(setLoading({
                status: 'done'
            }));
            Swal.fire({
                icon: 'success',
                title: 'Thêm thành công !',
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true
            })
            return true;
        }, 1000)
    } catch (error) {
        console.log(error);
        return false;
    }
} 

// Cập nhật phòng
export const updateRoom = (data) => async (dispatch) => {
    try {
        dispatch(setLoading({
            status: 'isLoading'
        }));
        setTimeout(async()=> {
            const roomRef = doc(db, 'Phong', data.data.id);
            await updateDoc(roomRef, {...data.data});
            dispatch(setLoading({
                status: 'done'
            }));
            Swal.fire({
                icon: 'success',
                title: 'Cập nhật thành công !',
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true
            })
        }, 1000)
    } catch (error) {
        console.log(error)
    }
}

// Xoá phòng
export const deleteRoom = (data) => async (dispatch) => {
    try {
        const phieuDatPhongRef = collection(db, 'phieuDatPhong');
        const dataPhieu = await getDocs(phieuDatPhongRef);
        if(dataPhieu.docs.findIndex((doc)=> doc.data().idPhong === data.id) != -1) {
            dispatch(setLoading({
                status: 'done'
            }))
            Swal.fire({
                icon: 'error',
                title: 'Phòng đang được đặt !',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true
            })
            return false;
        } else {
            await deleteDoc(doc(db, "Phong", data.id))
            dispatch(setLoading({
                status: 'done'
            }))
            Swal.fire({
                icon: 'success',
                title: 'Xoá thành công !',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true
            })
        }
    } catch (error) {
        return false;
    }
}