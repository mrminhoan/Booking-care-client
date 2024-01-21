import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: [],
    scheduleTimes: [],
    users: [],
    top_doctors: [],
    all_doctors: [],
    all_required_doctor_infor: {},

    isLoadingGender: false,
    isLoadingRole: false,
    isLoadingPosition: false,
    isLoadingUser: false,
    isLoadingTopDoctor: false,
    isLoadingAllDoctor: false,
    isLoadingSaveDetailDoctor: false,
    isLoadingScheduleTime: false,
    isLoadingRequiredDoctorInfor: false
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START: {
            let newState = { ...state };
            newState.isLoadingGender = true;
            return {
                ...newState,
            }
        };
        case actionTypes.FETCH_GENDER_SUCCESS: {
            let newState = { ...state };
            newState.genders = action.data;
            newState.isLoadingGender = false;
            return {
                ...newState,
            }
        };
        case actionTypes.FETCH_GENDER_FAILED: {
            let newState = { ...state };
            newState.isLoadingGender = false;
            newState.genders = [];
            return {
                ...newState,
            }
        };

        case actionTypes.FETCH_ROLE_START: {
            let newState = { ...state };
            newState.isLoadingRole = true;
            return {
                ...newState,
            }
        };
        case actionTypes.FETCH_ROLE_SUCCESS: {
            let newState = { ...state };
            newState.roles = action.data;
            newState.isLoadingRole = false;
            return {
                ...newState,
            }
        };
        case actionTypes.FETCH_ROLE_FAILED: {
            let newState = { ...state };
            newState.isLoadingRole = false;
            newState.roles = [];
            return {
                ...newState,
            }
        };


        case actionTypes.FETCH_POSITION_START: {
            let newState = { ...state };
            newState.isLoadingPosition = true;
            return {
                ...newState,
            }
        };
        case actionTypes.FETCH_POSITION_SUCCESS: {
            let newState = { ...state };
            newState.positions = action.data;
            newState.isLoadingPosition = false;
            return {
                ...newState,
            }
        };
        case actionTypes.FETCH_POSITION_FAILED: {
            let newState = { ...state };
            newState.isLoadingPosition = false;
            newState.positions = [];
            return {
                ...newState,
            }
        };


        case actionTypes.FETCH_ALL_USER_START: {
            let newState = { ...state };
            newState.isLoadingUser = true;
            return {
                ...newState
            }
        };
        case actionTypes.FETCH_ALL_USER_SUCCESS: {
            let newState = { ...state };
            newState.users = action.data;
            newState.isLoadingUser = false;
            return {
                ...newState
            }
        };
        case actionTypes.FETCH_ALL_USER_FAILED: {
            let newState = { ...state };
            newState.isLoadingUser = false;
            return {
                ...newState
            }
        };

        case actionTypes.FETCH_TOP_DOCTOR_START: {
            let newState = { ...state };
            newState.isLoadingTopDoctor = true;
            return {
                ...newState
            }
        };
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS: {
            let newState = { ...state };
            newState.top_doctors = action.data;
            newState.isLoadingTopDoctor = false;
            return {
                ...newState
            }
        };
        case actionTypes.FETCH_TOP_DOCTOR_FAILED: {
            let newState = { ...state };
            newState.isLoadingTopDoctor = false;
            return {
                ...newState
            }
        };


        case actionTypes.FETCH_ALL_DOCTOR_START: {
            let newState = { ...state };
            newState.isLoadingAllDoctor = true;
            return {
                ...newState
            }
        };
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS: {
            let newState = { ...state };
            newState.all_doctors = action.data;
            newState.isLoadingAllDoctor = false;
            return {
                ...newState
            }
        };
        case actionTypes.FETCH_ALL_DOCTOR_FAILED: {
            let newState = { ...state };
            newState.isLoadingAllDoctor = false;
            return {
                ...newState
            }
        };


        case actionTypes.SAVE_DETAIL_DOCTOR_START: {
            let newState = { ...state };
            newState.isLoadingSaveDetailDoctor = true;
            return {
                ...newState
            }
        };
        case actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS: {
            let newState = { ...state };
            newState.isLoadingSaveDetailDoctor = false;
            return {
                ...newState
            }
        };
        case actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS: {
            let newState = { ...state };
            newState.isLoadingSaveDetailDoctor = false;
            return {
                ...newState
            }
        };

        case actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_START: {
            let newState = { ...state };
            newState.isLoadingScheduleTime = true;
            return {
                ...newState,
            }
        };
        case actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_SUCCESS: {
            let newState = { ...state };
            newState.scheduleTimes = action.data;
            newState.isLoadingScheduleTime = false;
            return {
                ...newState,
            }
        };
        case actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_FAILED: {
            let newState = { ...state };
            newState.isLoadingScheduleTime = false;
            newState.scheduleTimes = [];
            return {
                ...newState,
            }
        };



        case actionTypes.FETCH_REQUIRE_DOCTOR_INFOR_START: {
            let newState = { ...state };
            newState.isLoadingRequiredDoctorInfor = true;
            return {
                ...newState,
            }
        };
        case actionTypes.FETCH_REQUIRE_DOCTOR_INFOR_SUCCESS: {
            let newState = { ...state };
            newState.all_required_doctor_infor = action.data;
            newState.isLoadingRequiredDoctorInfor = false;
            console.log(action.data)
            return {
                ...newState,
            }
        };
        case actionTypes.FETCH_REQUIRE_DOCTOR_INFOR_FAILED: {
            let newState = { ...state };
            newState.isLoadingRequiredDoctorInfor = false;
            newState.all_required_doctor_infor = {};
            return {
                ...newState,
            }
        };

        default:
            return state;
    }
}

export default adminReducer;