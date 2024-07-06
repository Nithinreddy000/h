import { getFinishedProductsData, postFakeProfile, postJwtProfile } from "../../helpers/fakebackend_helper";

// action
import { dataSuccess } from "./reducer";

export const fetchFinishedProductsData = () => async (dispatch) => {
    try {
        
           const response = await getFinishedProductsData();
           dispatch(dataSuccess(response));

    } catch (error) {
        //dispatch(profileError(error));
    }
};
