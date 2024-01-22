import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import { toast } from 'react-toastify';
// import LoadingOverlay from 'react-loading-overlay';

import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientForDoctor, postSendRemedy } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import RemedyModal from './RemedyModal';

class DefaultClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataRemedyModal: {},
            isShowLoading: false
        }
    }


    showHideDetaiInfor = (status) => { }


    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            await this.getDataPatient();
        })
    }
    getDataPatient = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formattedDate = new Date(currentDate).getTime();
        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formattedDate
        })
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }

    handleBtnConfirm = async (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName
        }
        this.setState({
            isOpenRemedyModal: true,
            dataRemedyModal: data
        })
    }

    sendRemedy = async (dataChild) => {
        this.setState({
            isShowLoading: true
        })
        let { dataRemedyModal } = this.state;
        let { email, imageBase64 } = dataChild;
        let res = await postSendRemedy({
            email: email,
            imageBase64: imageBase64,
            doctorId: dataRemedyModal.doctorId,
            patientId: dataRemedyModal.patientId,
            timeType: dataRemedyModal.timeType,
            patientName: dataRemedyModal.patientName
        });
        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading: false
            })
            toast.success("Send remedy succeed");
            this.closeRemedyModal();
            await this.getDataPatient();
        } else {
            this.setState({
                isShowLoading: true
            })
            toast.error("Something wrong");
        }
    }

    closeRemedyModal = () => {
        console.log('close')
        this.setState({
            isOpenRemedyModal: false,
            dataRemedyModal: {}
        })
    }

    async componentDidMount() {
        await this.getDataPatient()
    }

    async componentDidUpdate(prevProps, prevState, snapshot) { }

    render() {
        console.log('>>>> Check props', this.props);
        let { dataPatient } = this.state;
        let { language } = this.props;
        return (
            <>
                <div className='manage-patient-container'>
                    <div className='m-p-title'>
                        Quản lí bệnh nhân khám bệnh
                    </div>
                    <div className='manage-patient-body row'>
                        <div className='col-4 form-group'>
                            <label>Chọn ngày khám</label>
                            <DatePicker
                                className="form-control"
                                onChange={this.handleOnchangeDatePicker}
                                value={this.state.currentDate}
                            />
                        </div>
                        <div className='col-12 table-manage-patient'>
                            <table style={{ width: '100%' }}>
                                <tbody>
                                    <tr>
                                        <th>STT</th>
                                        <th>Thời gian</th>
                                        <th>HỌ và tên</th>
                                        <th>Địa chỉ</th>
                                        <th>Giới tính</th>
                                        <th>Actions</th>
                                    </tr>
                                    {
                                        dataPatient && dataPatient.length > 0 ?
                                            dataPatient.map((item, index) => {
                                                let time = language === LANGUAGES.VI ?
                                                    item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn;
                                                let gender = language === LANGUAGES.VI ?
                                                    item.patientData.genderData.valueVi : item.patientData.genderData.valueEn
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{time}</td>
                                                        <td>{item.patientData.firstName}</td>
                                                        <td>{item.patientData.address}</td>
                                                        <td>{gender}</td>
                                                        <td>
                                                            <button
                                                                className='btn-confirm'
                                                                onClick={() => this.handleBtnConfirm(item)}
                                                            >
                                                                Xác nhận
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            :
                                            <tr>
                                                <td colSpan={6} style={{ textAlign: "center" }}>No data</td>
                                            </tr>
                                    }
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div >

                <RemedyModal
                    isOpenModal={this.state.isOpenRemedyModal}
                    dataModal={this.state.dataRemedyModal}
                    closeRemedyModal={this.closeRemedyModal}
                    sendRemedy={this.sendRemedy}
                />


                {/* <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Loading your request'
                >
                    <p>Request Loading</p>
                </LoadingOverlay> */}
            </>

        );

    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
