import { Modal } from 'antd';
import React from 'react'

export const ModalCreate = (props) => {

    // Props
    const {methodSubmit, methodCancel, isOpen, childrenForm, title} = props;

    // Method
    
    const handleOk = () => {
        methodSubmit();
    };

    const handleCancel = () => {
        methodCancel()
    };

    // Return
    return (
        <Modal title={title} open={isOpen} onOk={handleOk} onCancel={handleCancel} footer={null} width={700}>
            {childrenForm}
        </Modal>
    )
}
