import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { Link } from 'react-router-dom/cjs/react-router-dom';

import "./ProfileDoctor.scss";
import { getProfileDoctorById } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}
        }
    }

    async componentDidMount() {
        let data = await this.getInforDoctorById(this.props.doctorId);
        this.setState({
            dataProfile: data
        })
    }

    getInforDoctorById = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorById(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        return result;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.doctorId !== prevProps.doctorId) {
            let data = await this.getInforDoctorById(this.props.doctorId);
            this.setState({
                dataProfile: data
            })
        }
    }

    showHideDetaiInfor = (status) => { }

    renderTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ?
                dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;

            let date = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd- DD/MM/YYYY')
                :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')

            return (
                <>
                    <div>{time} - {date}</div>
                    <div>Miễn phí đặt lịch</div>
                </>
            )
        }
        return <></>
    }

    render() {
        let { dataProfile } = this.state;
        let { language, isShowDescriptionDoctor, dataTime, isShowLinkDetail, doctorId } = this.props;
        let nameVi = '', nameEn = '';
        if (dataProfile && dataProfile.positionData) {
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName} `
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.firstName} ${dataProfile.lastName} `
        }
        return (
            <div className='profile-doctor-container'>
                <div className='intro-doctor'>
                    <div
                        className='content-left'
                        style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ""})` }}
                    >

                    </div>
                    <div className='content-right'>
                        <div className='up'>
                            {
                                language === LANGUAGES.EN ? nameEn : nameVi
                            }
                        </div>
                        <div className='down'>
                            {
                                dataProfile.Markdown && dataProfile.Markdown.description &&
                                <span>
                                    {dataProfile.Markdown.description}
                                </span>
                            }
                            {
                                this.renderTimeBooking(dataTime)
                            }
                        </div>
                    </div>

                </div>

                {
                    isShowLinkDetail &&
                    <div
                        className='view-detail-doctor'
                    >
                        <Link
                            to={`/detail-doctor/${doctorId}`}>
                            Xem thêm
                        </Link>

                    </div>
                }

                <div className='price'>
                    <FormattedMessage id={"patient.booking-modal.price"} />
                    {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.VI ?
                        <NumberFormat
                            value={dataProfile.Doctor_Infor.priceTypeData.valueVi}
                            displayType='text'
                            thousandSeparator={true}
                            suffix='VND'
                            className='currency'
                        />
                        :
                        ''
                    }
                    {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.EN ?
                        <NumberFormat
                            value={dataProfile.Doctor_Infor.priceTypeData.valueEn}
                            displayType='text'
                            thousandSeparator={true}
                            suffix='$'
                            className='currency'
                        />
                        :
                        ''
                    }
                </div>


            </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
