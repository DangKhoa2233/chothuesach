import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";

export const layDuLieuKhuVuc = () => async (dispatch) => {
    try {
        const areaRef = collection(db, 'Area');
        const result = await getDocs(areaRef);
        dispatch({
            type: 'LAY_DU_LIEU_KHU_VUC',
            payload: result
        })
    }
    catch(error) {
        console.log('Lỗi rồi !');
    }
}