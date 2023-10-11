import { addDoc, collection, deleteDoc, doc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../../firebase/firebase.config";
import { setLoading } from "./homeAction";

// Đăng nhập user
export const loginUser = (data) => async (dispatch) => {
    try {
        dispatch(setLoading({
            status: 'isLoading'
        }))
        const accountRef = collection(db, 'Account');
        const result = await getDocs(accountRef);
        // console.log('result docs', result.docs[0].data());
        
        const dataResult = result.docs.map((doc)=> ({...doc.data(), id: doc.id}));

        const findUser = dataResult?.filter((item)=>  item?.userName === data?.data?.userName && item?.password === data?.data?.password );

        if(findUser.length > 0) {
            if(findUser[0].loaiTaiKhoan === 'guest') {
                setTimeout(async()=> {
                    await dispatch({
                        type: 'DANG_NHAP_USER',
                        payload: {
                            data: findUser,
                            status: 200
                        }
                    })
                }, 1000)
            } else {
                setTimeout(()=> {
                    dispatch(setLoading({
                        status: 'done'
                    }))
                    Swal.fire({
                        icon: 'error',
                        iconColor: '#3790c7',
                        title: 'Tài khoản không được cấp phép!',
                        timer: 2000,
                        timerProgressBar: true,
                        confirmButtonColor: '#3790c7',
                    })
                }, 1000)
            }
        } else {
            // setTimeout(()=> {
            //     dispatch({
            //         type: 'DANG_NHAP_USER',
            //         payload: {
            //             data: null,
            //             status: 500
            //         }
            //     })
            // }, 1000)
            // alert()
            setTimeout(()=> {
                dispatch(setLoading({
                    status: 'done'
                }))
                let timerInterval;
                Swal.fire({
                    icon: 'error',
                    iconColor: '#3790c7',
                    title: 'Đăng nhập không thành công!',
                    timer: 2000,
                    timerProgressBar: true,
                    confirmButtonColor: '#3790c7',
                    // didOpen: () => {
                    //     Swal.showLoading()
                    //     const b = Swal.getHtmlContainer().querySelector('b')
                    //     timerInterval = setInterval(() => {
                    //     b.textContent = Swal.getTimerLeft()
                    //     }, 100)
                    // },
                    // willClose: () => {
                    //     clearInterval(timerInterval)
                    // }
                })
            }, 1000)
        }
    }
    catch(error) {
        dispatch({
            type: 'DANG_NHAP_USER',
            payload: {
                data: null,
                status: 500
            }
        })
    }
}

// Đăng ký user
export const registerUser = (data) => async (dispatch) => {
    try {
        dispatch(setLoading({
            status: 'isLoading'
        }))
        // Lấy collection từ firebase 
        const accountRef = collection(db, 'Account');
        const result = await getDocs(accountRef);
        const dataResult = result.docs.map((item)=> item.data());
        // ES6 => Tìm vị trí => Nếu tìm thấy vị trí sẽ xuất ra giá trị khác -1, và ngược lại
        const findIndex = dataResult.findIndex(item=>item.userName === (data.data.userName || data.userName));
        if(findIndex === -1) {
            setTimeout(async ()=> {
                // Tạo document trong collection Account 
                await addDoc(collection(db, 'Account'), {
                    ...data.data, createAt: serverTimestamp()});
                dispatch(setLoading({
                    status: 'done'
                }))
                // Thông báo
                Swal.fire({
                    icon: 'success',
                    title: 'Tạo tài khoản thành công !',
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true
                })
                // Chuyển hướng người dùng về trang login
                if(data.data.loaiTaiKhoan === "guest") {
                    window.location.replace('/user/login');
                }
            }, 1000);
            return true;
        } else {
            // Trường hợp tài khoản đã tồn tại
            setTimeout(async ()=> {
                dispatch(setLoading({
                    status: 'done'
                }))
                Swal.fire({
                    icon: 'error',
                    title: 'Tài khoản đã tồn tại !',
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true
                })
            }, 1000);
            return false;
        }
    } catch(error) {
        console.log(error)
        return false;
    }
}

// Đăng nhập admin
export const loginAdmin = (data) => async (dispatch) => {
    try {
        dispatch(setLoading({
            status: 'isLoading'
        }))
        const accountRef = collection(db, 'Account');
        const result = await getDocs(accountRef);
        // console.log('result docs', result.docs[0].data());
        
        const dataResult = result.docs.map((doc)=> ({...doc.data(), id: doc.id}));

        const findUser = dataResult?.filter((item)=>  item?.userName === data?.data?.userName && item?.password === data?.data?.password );


        if(findUser.length > 0) {
            if(findUser[0].loaiTaiKhoan === 'admin') {
                setTimeout(async()=> {
                    await dispatch({
                        type: 'DANG_NHAP_ADMIN',
                        payload: {
                            data: findUser,
                            status: 200
                        }
                    })
                }, 1000)
            } else {
                setTimeout(()=> {
                    dispatch(setLoading({
                        status: 'done'
                    }))
                    Swal.fire({
                        icon: 'error',
                        iconColor: '#3790c7',
                        title: 'Tài khoản không được cấp phép!',
                        timer: 2000,
                        timerProgressBar: true,
                        confirmButtonColor: '#3790c7',
                    })
                }, 1000)
            }
        } else {
            setTimeout(()=> {
                dispatch(setLoading({
                    status: 'done'
                }))
                let timerInterval;
                Swal.fire({
                    icon: 'error',
                    iconColor: '#3790c7',
                    title: 'Đăng nhập không thành công!',
                    timer: 2000,
                    timerProgressBar: true,
                    confirmButtonColor: '#3790c7',
                })
            }, 1000)
        }
    }
    catch(error) {
        dispatch({
            type: 'DANG_NHAP_ADMIN',
            payload: {
                data: null,
                status: 500
            }
        })
    }
}

// Lấy thông tin account với id
export const getUser = (id) => async (dispatch) => {
    try {
        const accountRef = collection(db, 'Account');
        const result = await getDocs(accountRef);
        const resultFilter = result.docs.filter(item => item.id === id);
        dispatch({
            type: 'LAY_DU_LIEU_USER',
            payload: {...resultFilter[0].data(), id: resultFilter[0].id},
        })
    } catch (error) {
        console.log(error);
    }
}

// Lấy thông tin tất cả account
export const getAllUser = () => async (dispatch) => {
    try {
        dispatch(setLoading({
            status: 'isLoading'
        }))
        const accountRef = collection(db, 'Account');
        const result = await getDocs(accountRef);
        await dispatch({
            type: 'LAY_DU_LIEU_USER_ALL',
            payload: result,
        })
        setTimeout(async()=> {
            dispatch(setLoading({
                status: 'done'
            }))
        }, 500)
    } catch (error) {
        console.log(error)
    }
}

export const getAllUserNotReducer = () => async (dispatch) => {
    try {
        // dispatch(setLoading({
        //     status: 'isLoading'
        // }))
        const accountRef = collection(db, 'Account');
        const result = await getDocs(accountRef);
        // dispatch(setLoading({
        //     status: 'done'
        // }))
        return result.docs.map((item)=>({...item.data(), id: item.id}));
    } catch (error) {
        // console.log(error)
        return 500;
    }
}


// Cập nhật thông tin account
export const updateUser = (data) => async (dispatch) => {
    try {
        dispatch(setLoading({
            status: 'isLoading'
        }))
        setTimeout(async ()=> {
            // Lấy trên firebase một document có id bằng ...
            const accountRef = doc(db,'Account', data.data.id);
            await updateDoc(accountRef, data.data);
            dispatch(setLoading({
                status: 'done'
            }))
            Swal.fire({
                icon: 'success',
                title: 'Cập nhật thành công !',
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true
            })
        }, 1000);
        return true;
    } catch (error) {
        return false;
        // console.log(error);
    }
}


// Xoá account
export const deleteUser = (data) => async (dispatch) => {
    try {
        dispatch(setLoading({
            status: 'isLoading'
        }))
        debugger;
        const phieuDatPhongRef = collection(db, 'phieuDatPhong');
        const dataRef = await getDocs(phieuDatPhongRef);
        setTimeout(async()=> {
            if((dataRef.docs.findIndex((item)=> item.data().idKhachHang === data.data.id)) != -1) {
                // Trường hợp khách hàng đang đặt phòng
                dispatch(setLoading({
                    status: 'done'
                }))
                Swal.fire({
                    icon: 'error',
                    title: 'Khách hàng đang đặt phòng !',
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true
                })
            } else {
                // Trường hợp khách hàng không đặt phòng
                await deleteDoc(doc(db, "Account", data.data.id));
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
            }
        }, 500)
    } catch (error) {
        console.log(error)
    }
}