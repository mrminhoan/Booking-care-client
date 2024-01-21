import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';
import Select from 'react-select';
import { toast } from 'react-toastify';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import localization from 'moment/locale/vi';


import "./BookingModal.scss";
import ProfileDoctor from '../ProfileDoctor';
import DatePicker from '../../../../components/Input/DatePicker';
import * as  actions from '../../../../store/actions';
import { LANGUAGES } from '../../../../utils';
import { postPatientBookAppointment } from '../../../../services/userService';
class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: '',
            doctorId: '',
            genders: [],
            timeType: ''
        }
    }

    async componentDidMount() {
        this.props.fetchGender()
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genderRedux)
            })
        }

        if (this.props.genderRedux !== prevProps.genderRedux) {
            this.setState({
                genders: this.buildDataGender(this.props.genderRedux)
            }, () => console.log(this.state.genders))
        }

        if (this.props.dataTime !== prevProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId;
                let timeType = this.props.dataTime.timeType;
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                })
            }
        }
    }

    buildDataGender = (data) => {
        let result = [];
        let { language } = this.props;
        if (data && data.length > 0) {
            result = data.map(item => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                return object
            })
        }
        return result;
    }

    showHideDetaiInfor = (status) => { }

    handleOnChangeInput = (e, id) => {
        let valueInput = e.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy
        })
    }

    handleOnchangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }
    handleOnChangeSelectGender = (selectedOption) => {
        this.setState({
            selectedGender: selectedOption
        })
    }

    handleConfirmBooking = async () => {
        let date = new Date(this.state.birthday).getTime();
        let timeString = this.buildTimeBooking(this.props.dataTime);
        let doctorName = this.buildDoctorName(this.props.dataTime);
        let obj = {
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: this.props.dataTime.date,
            birthday: date,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName
        }
        let res = await postPatientBookAppointment(obj);
        if (res && res.errCode === 0) {
            toast.success("Booking appointment succeed");
            this.props.closeBookingModal();
        } else {
            toast.error("Booking appointment failed");
        }
    }

    buildTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ?
                dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;

            let date = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd- DD/MM/YYYY')
                :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')


            return `${time} - ${date}`
        }
        return <></>
    }

    buildDoctorName = (dataTime) => {
        try {
            if (dataTime && !_.isEmpty(dataTime)) {
                let name = `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`;
                return name;
            }
            return <></>
        } catch (error) {
            console.log(error)
            return <></>
        }
    }

    render() {
        let { isOpenModal, closeBookingModal, dataTime } = this.props;
        let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : '';
        return (
            <>
                <Modal
                    isOpen={isOpenModal}
                    className={'booking-modal-container'}
                    size='lg'
                    centered
                    toggle={closeBookingModal}
                >
                    <div className='booking-modal-content'>
                        <div className='booking-modal-header'>
                            <span className='left'>
                                <FormattedMessage id={"patient.booking-modal.title"} />
                            </span>
                            <span
                                className='right'
                                onClick={closeBookingModal}
                            >
                                <i className='fas fa-times'></i>
                            </span>

                        </div>
                        <div className='booking-modal-body'>
                            <div className='doctor-infor'>
                                <ProfileDoctor
                                    doctorId={doctorId}
                                    isShowDescriptionDoctor={false}
                                    dataTime={dataTime}
                                />
                            </div>
                            <div className='row'>
                                <div className='col-6 form-group'>
                                    <label>
                                        <FormattedMessage id={"patient.booking-modal.fullname"} />
                                    </label>
                                    <input
                                        className='form-control'
                                        value={this.state.fullName}
                                        onChange={e => this.handleOnChangeInput(e, 'fullName')}
                                    />
                                </div>

                                <div className='col-6 form-group'>
                                    <label>
                                        <FormattedMessage id={"patient.booking-modal.phonenumber"} />
                                    </label>
                                    <input
                                        className='form-control'
                                        value={this.state.phoneNumber}
                                        onChange={e => this.handleOnChangeInput(e, 'phoneNumber')}
                                    />
                                </div>

                                <div className='col-6 form-group'>
                                    <label>
                                        <FormattedMessage id={"patient.booking-modal.email"} />
                                    </label>
                                    <input
                                        className='form-control'
                                        value={this.state.email}
                                        onChange={e => this.handleOnChangeInput(e, 'email')}
                                    />
                                </div>

                                <div className='col-6 form-group'>
                                    <label>
                                        <FormattedMessage id={"patient.booking-modal.address"} />
                                    </label>
                                    <input
                                        className='form-control'
                                        value={this.state.address}
                                        onChange={e => this.handleOnChangeInput(e, 'address')}
                                    />
                                </div>

                                <div className='col-12 form-group'>
                                    <label>
                                        <FormattedMessage id={"patient.booking-modal.reason"} />
                                    </label>
                                    <input
                                        className='form-control'
                                        value={this.state.reason}
                                        onChange={e => this.handleOnChangeInput(e, 'reason')}
                                    />
                                </div>

                                <div className='col-6 form-group'>
                                    <label>
                                        <FormattedMessage id={"patient.booking-modal.birthday"} />
                                    </label>
                                    <DatePicker
                                        className="form-control"
                                        onChange={this.handleOnchangeDatePicker}
                                        value={this.state.birthday}
                                    />
                                </div>

                                <div className='col-6 form-group'>
                                    <label>
                                        <FormattedMessage id={"patient.booking-modal.gender"} />
                                    </label>
                                    <Select
                                        value={this.state.selectedGender}
                                        options={this.state.genders}
                                        onChange={this.handleOnChangeSelectGender}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='booking-modal-footer'>
                            <button
                                className='btn-booking-confirm'
                                onClick={() => this.handleConfirmBooking()}
                            >
                                <FormattedMessage id={"patient.booking-modal.btn-confirm"} />

                            </button>
                            <button className='btn-booking-cancel'>
                                <FormattedMessage id={"patient.booking-modal.btn-cancel"} />
                            </button>
                        </div>
                    </div>
                </Modal>
            </>
        );

    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGender: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
