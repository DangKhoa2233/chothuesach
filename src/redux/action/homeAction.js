
export const setLoading = (data) => async (dispatch) => {
    try {
        if(data.status === 'isLoading') {
            dispatch({
                type: 'IS-LOADING',
                payload: null
            })
        } else {
            dispatch({
                type: 'DONE-LOADING',
                payload: null
            })
        }
    } catch(error) {
        console.log('Lỗi rồi!');
    }
}


export const setConfirm = (data) => async (dispatch) => {
    if(data.status === 'open') {
        dispatch({
            type: 'OPEN-CONFIRM',
            payload: data.method
        })
    } else {
        dispatch({
            type: 'CLOSE-CONFIRM',
            payload: null
        })
    }
}