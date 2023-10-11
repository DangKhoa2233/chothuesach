import { db } from '../../firebase/firebase.config';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore'; 
import { setLoading } from './homeAction';
import Swal from 'sweetalert2';

export const getAllDichVu = () => async (dispatch) => {
    try {
        dispatch(setLoading({
            status: 'isLoading'
        }))
        const dichVuRef = collection(db, 'dichVu');
        setTimeout(async()=> {
            const result = await getDocs(dichVuRef);
            dispatch({
                type: 'LAY_TAT_CA_DICH_VU',
                payload: result.docs.map((doc)=>({...doc.data(),id:doc.id}))
            })
            dispatch(setLoading({
                status: 'done'
            }))
        }, 1000)
    } catch (error) {
        console.log(error)
    }
} 

// Tạo dịch vụ
export const createDichVu = (data) => async (dispatch) => {
    try {
        dispatch(setLoading({
            status: 'isLoading'
        }));
        setTimeout(async()=> {
            await addDoc(collection(db, 'dichVu'), {...data.data});
            dispatch(setLoading({
                status: 'done'
            }));
            Swal.fire({
                icon: 'success',
                title: 'Tạo dịch vụ thành công !',
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true
            }).finally(()=> { return true; })
        }, 500) 
    } catch (err) {
        return false;
    }
}

// Xóa dịch vụ
export const deleteDichVu = (id) => async (dispatch) => {
    try {
        dispatch(setLoading({
            status: 'isLoading'
        }))
        setTimeout(async()=> {
            // if()
            await deleteDoc(doc(db, "dichVu", id));
            dispatch(setLoading({
                status: 'done'
            }))
            Swal.fire({
                icon: 'success',
                title: 'Xoá thành công !',
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true
            })
        }, 500)
    } catch (err) {
        return false;
    }
}