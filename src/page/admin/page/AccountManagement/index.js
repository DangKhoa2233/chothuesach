import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { Confirm } from '../../../../component/Confirm/Confirm';
import { db } from '../../../../firebase/firebase.config';
import { deleteUser, getAllUser, registerUser, updateUser } from '../../../../redux/action/accountAction';
import { setConfirm } from '../../../../redux/action/homeAction';
// import { FormEdit } from '../../shareComponent/form/FormEdit';
// import { FormEdit } from '../../shareComponent/form/FormEdit';
import { FormCreate } from '../../shareComponent/form/FormCreate';
import { FormUpdate } from '../../shareComponent/form/FormUpdate';
import { ModalCreate } from '../../shareComponent/modal/ModalCreate';
import { ModalEdit } from '../../shareComponent/modal/ModalEdit';
import { TableMain } from '../../shareComponent/table/TableMain'
import { columns, ColumnsCreate, ColumnsEdit, getDataTable, validationSchemaCreateUser } from './helper';

const AccountManagement = (props) => {

    // State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [dataEdit, setDataEdit] = useState({});

    // SomeThing
    const dispatch = useDispatch();

    const {t} = useTranslation();

    useEffect(()=> {
        dispatch(getAllUser());
    }, []);

    useEffect(()=> {
      // Khi có một account thay đổi => gọi lại dữ liệu
      onSnapshot(collection(db,'Account'), (snapShot) => {
        dispatch(getAllUser())
      });
    }, [])

    // API
    const {listUser} = useSelector(state=>state.account);

    // Method
    const handleAdd = () => {
      setIsModalOpen(true);
    }

    const handleEdit = (data) => {
      setDataEdit(data);
      setIsModalEditOpen(true);
    }

    const handleDelete = async (data) => {
      await dispatch(setConfirm({
        status: 'open',
        method: async () => await dispatch(deleteUser({
            data: data
        })).then((clg)=> {
            if(clg) {
                // reset();
                // methodCancel();
            }
        }).catch((err)=> {
            Swal.fire({
                icon: 'error',
                title: 'Xoá thất bại !',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true
            })
        })
      }))
    }

    const data = useMemo(()=> 
      getDataTable(listUser)
    , [listUser]);

    // Render 
    return (
      <>
        <div className="h-[12%] flex justify-between items-center">
          <h3 className="text-[20px] text-[#3790c7] font-bold">{t('Account Management')}</h3>
          <button className='flex items-center justify-center bg-[#3790c7] text-white py-[10px] px-[20px] rounded-[7px] duration-300 hover:shadow-[#3790c7a6] hover:shadow-lg hover:translate-y-[-3px]' type="submit" onClick={handleAdd}>{t('add')}</button>
        </div>
        <div className="h-[88%]">
            <TableMain data={data} columns={columns} handleEdit={handleEdit} handleDelete={handleDelete}/>
        </div>
        <ModalCreate
          methodCancel={()=>setIsModalOpen(false)}
          title={t('Create Account Management ')}
          isOpen={isModalOpen}
          childrenForm={
            <FormCreate
              columns={ColumnsCreate} 
              methodCancel={()=>setIsModalOpen(false)} 
              methodSubmit={registerUser}
              validationSchema={validationSchemaCreateUser}
            />
          }
        />
        <ModalEdit
          methodCancel={()=>setIsModalEditOpen(false)}
          title={t('Edit Account Management ')}
          isOpen={isModalEditOpen}
          childrenForm={
            <FormUpdate
              columns={ColumnsEdit} 
              methodCancel={()=>setIsModalEditOpen(false)} 
              methodSubmit={updateUser}
              validationSchema={validationSchemaCreateUser}
              dataEdit={dataEdit}
            />
            // <>fdaffsaf</>
          }
        />
        <Confirm/>
      </>
    )
}

export default AccountManagement