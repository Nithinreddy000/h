import { getMainDashboardData, postFakeProfile, postJwtProfile } from "../../helpers/fakebackend_helper";

// action
import { dataSuccess } from "./reducer";

export const fetchMainDashboardData = () => async (dispatch) => {
    try {
        
           const response = await getMainDashboardData();
           dispatch(dataSuccess(response));

    } catch (error) {
        //dispatch(profileError(error));
    }
};
