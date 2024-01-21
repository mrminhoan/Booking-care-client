import actionTypes from "./actionTypes";
import {
    getAllCodeService,
    createNewUserService,
    getAllUsers,
    deleteUserService,
    editUserService,
    getTopDoctorHomeService,
    getAllDoctorHomeService,
    saveDoctorInforService,
    getAllSpecialty,
    getAllClinic
} from "../../services/userService";
import { toast } from "react-toastify";
import { FormattedMessage } from 'react-intl';

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })

            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (error) {
            dispatch(fetchGenderFailed());
            console.log("fetchGender", error)
        }
    }
}

export const fetchGenderSuccess = (gender_data) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: gender_data
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})


export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ROLE_START })

            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (error) {
            dispatch(fetchRoleFailed());
            console.log("fetchRole", error)
        }
    }
}

export const fetchRoleSuccess = (gender_data) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: gender_data
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})


export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_POSITION_START })

            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (error) {
            dispatch(fetchPositionFailed());
            console.log("fetchPosition", error)
        }
    }
}

export const fetchPositionSuccess = (position_data) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: position_data
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})


export const fetchTimeSchedule = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_START })

            let res = await getAllCodeService("TIME");
            if (res && res.errCode === 0) {
                dispatch(fetchTimeScheduleSuccess(res.data));
            } else {
                dispatch(fetchTimeScheduleFailed());
            }
        } catch (error) {
            dispatch(fetchTimeScheduleFailed());
            console.log("fetch time allCode scheduler ", error)
        }
    }
}

export const fetchTimeScheduleSuccess = (time_data) => ({
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_SUCCESS,
    data: time_data
})

export const fetchTimeScheduleFailed = () => ({
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_FAILED
})

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            // dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success(<FormattedMessage id={"notification.create-user-success"} />)
                dispatch(saveUserSuccess(res));
                dispatch(fetchAllUserStart());
            } else {
                dispatch(saveUserFailed());
            }
        } catch (error) {
            dispatch(saveUserFailed());
            console.log("CreateNewUser", error)
        }
    }
}

export const saveUserSuccess = (data) => ({
    type: actionTypes.SAVE_USER_SUCCESS,
    data: data
})

export const saveUserFailed = () => ({
    type: actionTypes.SAVE_USER_FAILED
})


export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ALL_USER_START })

            let res = await getAllUsers("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (error) {
            dispatch(fetchGenderFailed());
            console.log("fetchAllUSer", error)
        }
    }
}
export const fetchAllUserSuccess = (userData) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    data: userData
})

export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED
})


export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            // dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success(<FormattedMessage id={"notification.delete-user-success"} />);
                dispatch(deleteUserSuccess(res));
                dispatch(fetchAllUserStart());
            } else {
                toast.error(<FormattedMessage id={"notification.delete-user-failed"} />);
                dispatch(saveUserFailed());
            }
        } catch (error) {
            toast.error(<FormattedMessage id={"notification.delete-user-failed"} />);
            dispatch(deleteUserFailed());
            console.log("CreateNewUser", error)
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            // dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success(<FormattedMessage id={"notification.edit-user-success"} />);
                dispatch(editUserSuccess(res));
                dispatch(fetchAllUserStart());
            } else {
                toast.error(<FormattedMessage id={"notification.edit-user-failed"} />);
                dispatch(editUserFailed());
            }
        } catch (error) {
            dispatch(editUserFailed());
            toast.error(<FormattedMessage id={"notification.edit-user-failed"} />);
            console.log("Edit User", error)
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})

export const fetchTopDoctor = (limit = 10) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_TOP_DOCTOR_START });
            let res = await getTopDoctorHomeService(limit);
            if (res && res.errCode === 0) {
                dispatch(fetchTopDoctorSuccess(res.data));
            } else {
                dispatch(fetchTopDoctorFailed());
            }
        } catch (error) {
            console.log("Fetch Top Doctor Error: ", error)
            dispatch(fetchTopDoctorFailed());
        }
    }

}

export const fetchTopDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
    data: data
})

export const fetchTopDoctorFailed = () => ({
    type: actionTypes.FETCH_TOP_DOCTOR_FAILED
})


export const fetchAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ALL_DOCTOR_START });
            let res = await getAllDoctorHomeService();
            if (res && res.errCode === 0) {
                dispatch(fetchAllDoctorSuccess(res.data));
            } else {
                dispatch(fetchAllDoctorFailed());
            }
        } catch (error) {
            console.log("Fetch All Doctor Error: ", error)
            dispatch(fetchAllDoctorFailed());
        }
    }

}

export const fetchAllDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
    data: data
})

export const fetchAllDoctorFailed = () => ({
    type: actionTypes.FETCH_ALL_DOCTOR_FAILED
})


export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.SAVE_DETAIL_DOCTOR_START });
            let res = await saveDoctorInforService(data);
            if (res && res.errCode === 0) {
                dispatch(saveDetailDoctorSuccess());
                toast.success("Save doctor successfully")

            } else {
                dispatch(saveDetailDoctorFailed());
                toast.error("Save doctor infor failed");
            }
        } catch (error) {
            console.log("Save doctor detail Error: ", error)
            dispatch(saveDetailDoctorFailed());
            toast.error("Save doctor infor failed");
        }
    }

}

export const saveDetailDoctorSuccess = (data) => ({
    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
    data: data
})

export const saveDetailDoctorFailed = () => ({
    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
})


export const getRequireDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRE_DOCTOR_INFOR_START })

            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");
            let resSpecialty = await getAllSpecialty();
            let resClinic = await getAllClinic();
            if (resPrice && resPrice.errCode === 0 &&
                resPayment && resPayment.errCode === 0 &&
                resProvince && resProvince.errCode === 0 &&
                resSpecialty && resSpecialty.errCode === 0 &&
                resClinic && resClinic.errCode === 0
            ) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data
                }
                dispatch(getRequireDoctorInforSuccess(data));
            } else {
                dispatch(getRequireDoctorInforFailed());
            }
        } catch (error) {
            dispatch(getRequireDoctorInforFailed());
            console.log("fetchGender", error)
        }
    }
}

export const getRequireDoctorInforSuccess = (data) => ({
    type: actionTypes.FETCH_REQUIRE_DOCTOR_INFOR_SUCCESS,
    data: data
})

export const getRequireDoctorInforFailed = () => ({
    type: actionTypes.FETCH_REQUIRE_DOCTOR_INFOR_FAILED
})