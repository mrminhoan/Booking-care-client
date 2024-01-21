import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import moment from 'moment';
import _ from 'lodash'
import { toast } from 'react-toastify';
import "./ManageScheduler.scss";
import * as actions from "../../../store/actions";
import DatePicker from '../../../components/Input/DatePicker';
import FormattedDate from '../../../components/Formating/FormattedDate';
import { LANGUAGES, dateFormat } from '../../../utils';
import { saveBulkScheduleDoctor } from '../../../services/userService';
class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorOptions: [],
            doctorSelected: {},
            currentDate: '',
            rangeTime: []
        }
    }

    handleChangeSelectDoctor = async (e) => {
        this.setState({ doctorSelected: e });
    }
    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }
    handleOnClickBtnTime = (time) => {
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item
            })
        }
        this.setState({
            rangeTime: rangeTime
        }, () => console.log(this.state))
    }

    handleSaveSchedule = async () => {
        let { rangeTime, doctorSelected, currentDate } = this.state;
        let result = [];
        if (!currentDate) {
            toast.error("Invailid date");
            return;
        }
        if (doctorSelected && _.isEmpty(doctorSelected)) {
            toast.error("Invalid doctor selected");
            return;
        }
        let formattedTime = new Date(currentDate).getTime();
        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true);
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map(time => {
                    let object = {};
                    object.doctorId = doctorSelected.value;
                    object.date = formattedTime;
                    object.timeType = time.keyMap;
                    result.push(object)
                })
            } else {
                toast.error("Invalid selected time");
                return;
            }
        }

        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: doctorSelected.value,
            dateFormatted: formattedTime
        });
        if (res && res.errCode === 0) {
            toast.success("Edit doctor's scheduler successfully");
        } else {
            toast.error("Edit doctor's scheduler failed");
            console.log(res);
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchAllScheduleTime();
    }

    componentDidUpdate(prevProps, preState) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            this.setState({
                doctorOptions: this.props.allDoctors
            })
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime;
            if (data && data.length) {
                data = data.map(item => ({ ...item, isSelected: true }))
            }
            this.setState({
                rangeTime: this.props.allScheduleTime
            })
        }
    }
    render() {
        let { doctorOptions, rangeTime } = this.state;
        let { language } = this.props;
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        return (
            <div className='manage-scheduler-container'>
                <div className='m-s-title'>
                    <FormattedMessage id={"manage-scheduler.title"} />
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id={"manage-scheduler.choose-doctor"} /></label>
                            <Select
                                value={this.state.doctorSelected}
                                onChange={(e) => this.handleChangeSelectDoctor(e)}
                                options={doctorOptions && doctorOptions.map(doctor => {
                                    return {
                                        value: doctor.id,
                                        label: `${doctor.firstName} ${doctor.lastName}`
                                    }
                                })}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id={"manage-scheduler.choose-date"} /></label>
                            <DatePicker
                                className="form-control"
                                onChange={this.handleOnchangeDatePicker}
                                value={this.state.currentDate}
                                minDate={yesterday}
                            />
                        </div>
                        <div className='col-12 pick-hour-container'>
                            {
                                rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <button
                                            className={item.isSelected === true ? 'btn-schedule actived' : "btn-schedule"}
                                            key={index}
                                            onClick={() => this.handleOnClickBtnTime(item)}
                                        >
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })
                            }
                        </div>
                        <div className='col-12'>
                            <button
                                className='btn btn-primary btn-save-schedule'
                                onClick={() => this.handleSaveSchedule()}
                            >
                                <FormattedMessage id={"manage-scheduler.save"} />
                            </button>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.all_doctors,
        allScheduleTime: state.admin.scheduleTimes,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctor()),
        fetchAllScheduleTime: () => dispatch(actions.fetchTimeSchedule())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
