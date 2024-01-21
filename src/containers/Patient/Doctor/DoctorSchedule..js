import React, { Component } from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import moment, { lang } from 'moment';
import HomeHeader from '../../HomPage/HomeHeader';
import localization from 'moment/locale/vi';
import { FormattedMessage } from 'react-intl';

import './DoctorSchedule.scss';
import { getDetailInforDoctor, getScheduleDoctorByDate } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import BookingModal from './Modal/BookingModal';
class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvalableTime: [],
            isOpenModalBooking: false,
            dataScheduleTimeModal: {}
        }
    }

    async componentDidMount() {
        let { language } = this.props;
        let allDays = this.getArrDays(language);
        if (this.props.doctorIdFromParent) {
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value);
            this.setState({
                allAvalableTime: res.data ? res.data : []
            })
        }

        if (allDays && allDays.length > 0) {
            this.setState({
                allDays: allDays,
            })
        }

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let alLDays = this.getArrDays(this.props.language);
            this.setState({
                allDays: alLDays
            })
        }

        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let allDays = this.getArrDays(this.props.language);
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value);
            this.setState({
                allAvalableTime: res.data ? res.data : []
            })
        }

    }

    capitalizeFirstLetter(string) {
        try {
            return string.charAt(0).toUpperCase() + string.slice(1);
        } catch (error) {
            console.log(error)
            return ""
        }

    }

    getArrDays = (language) => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let _labelVi = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${_labelVi}`;
                    object.label = today;
                } else {
                    let labelVi = moment(new Date()).add(i, 'days').format('ddd - DD/MM');
                    object.label = this.capitalizeFirstLetter(labelVi);
                }
            } else {
                if (i === 0) {
                    let _labelEn = moment(new Date()).format('DD/MM');
                    let today = `Today - ${_labelEn}`;
                    object.label = today;
                } else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                }
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();

            allDays.push(object);
        }
        return allDays
    }
    handleOnChangeSelectDate = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value
            let res = await getScheduleDoctorByDate(doctorId, date);
            if (res && res.errCode === 0) {
                this.setState({
                    allAvalableTime: res.data ? res.data : []
                })
            }
        }
    }

    handleClickScheduleTime = time => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time
        })
    }

    closeBookingModal = () => {
        this.setState({
            isOpenModalBooking: false
        })
    }

    render() {
        let { allDays, allAvalableTime } = this.state;
        let { language } = this.props

        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select onChange={(event) => this.handleOnChangeSelectDate(event)}>
                            {
                                allDays && allDays.length > 0 &&
                                allDays.map((day, index) => {
                                    return <option key={index} value={day.value}>{day.label}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className='all-available-time'>
                        <div className='text-calendar'>
                            <i className='fas fa-calendar-alt'>
                                <span>
                                    <FormattedMessage id={"patient.detail-doctor.schedule"} />
                                </span>
                            </i>
                        </div>
                        <div className='time-content'>
                            {allAvalableTime && allAvalableTime.length > 0 ?
                                <>
                                    <div className='time-content-btns'>
                                        {
                                            allAvalableTime.map((item, index) => {
                                                let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                                return (
                                                    <button
                                                        key={index}
                                                        className={language === LANGUAGES.VI ? "btn-vie" : "btn-en"}
                                                        onClick={() => this.handleClickScheduleTime(item)}
                                                    >
                                                        {timeDisplay}
                                                    </button>
                                                )
                                            })
                                        }

                                    </div>

                                    <div className='book-free'>
                                        <span>
                                            <FormattedMessage id={"patient.detail-doctor.choose"} />
                                            <i className='far fa-hand-point-up'></i>
                                            <FormattedMessage id={"patient.detail-doctor.book-free"} />
                                        </span>
                                    </div>
                                </>
                                : <div className='no-schedule'>
                                    <FormattedMessage id={"patient.detail-doctor.none-schedule"} />
                                </div>
                            }
                        </div>
                    </div>
                </div>

                <BookingModal
                    isOpenModal={this.state.isOpenModalBooking}
                    closeBookingModal={this.closeBookingModal}
                    dataTime={this.state.dataScheduleTimeModal}
                />
            </>

        );

    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
