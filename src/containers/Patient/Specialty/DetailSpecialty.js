import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';

import "./DetailSpecialty.scss";
import HomeHeader from '../../HomPage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule.';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailSpecialtyById, getAllCodeService } from '../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';
class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [23, 17],
            dataDetailSpecialty: {},
            listProvince: []
        }
    }

    async componentDidMount() {
        if (this.props.match &&
            this.props.match.params &&
            this.props.match.params.id) {
            let id = this.props.match.params.id;
            let response = await getDetailSpecialtyById({
                id: id,
                location: "ALL"
            });

            let resProvince = await getAllCodeService('PROVINCE')

            if (response
                && response.errCode === 0
                && resProvince
                && resProvince.errCode === 0
            ) {
                let data = response.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(response.data)) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
                let dataProvince = resProvince.data;
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        keyMap: 'ALL',
                        type: 'PROVINCE',
                        valueEn: 'All',
                        valueVi: 'Toàn Quốc'
                    })
                }
                this.setState({
                    dataDetailSpecialty: response.data,
                    arrDoctorId: arrDoctorId,
                    listProvince: dataProvince ? dataProvince : []
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) { }

    showHideDetaiInfor = (status) => { }


    handleOnchangeSelectProvince = async (event) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let location = event.target.value;


            let response = await getDetailSpecialtyById({
                id: id,
                location: location
            });
            if (response
                && response.errCode === 0) {
                let data = response.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(response.data)) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
                this.setState({
                    dataDetailSpecialty: response.data,
                    arrDoctorId: arrDoctorId,
                })
            }
        }
    }

    getDataDetailSpecialty = () => {

    }

    render() {
        let { arrDoctorId, dataDetailSpecialty, listProvince } = this.state;
        let { language } = this.props;
        return (
            <div className='detail-specialty-container'>
                <HomeHeader />
                <div className='detail-specialty-body'>
                    <div className='description-specialty'>
                        {
                            dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) &&

                            < div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }} />
                        }

                    </div>

                    <div className='search-sp-doctor' >
                        <select
                            onChange={(event) => this.handleOnchangeSelectProvince(event)}
                        >
                            {listProvince && listProvince.length > 0 && listProvince.map((item, index) => {
                                return (
                                    <option key={index} value={item.keyMap}>
                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                    </option>
                                )
                            })}
                        </select>
                    </div>


                    {
                        arrDoctorId && arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => {
                            console.log({ item })
                            return (
                                <div className='each-doctor' key={index}>
                                    <div className='dt-content-left'>
                                        <ProfileDoctor
                                            doctorId={item}
                                            isShowDescriptionDoctor={false}
                                            isShowLinkDetail={true}
                                        // dataTime={dataTime}
                                        />
                                    </div>

                                    <div className='dt-content-right'>
                                        <div className='doctor-schedule'>
                                            <DoctorSchedule
                                                doctorIdFromParent={item}
                                            />
                                        </div>

                                        <div className='doctor-extra-infor'>
                                            <DoctorExtraInfor
                                                doctorIdFromParent={item} />
                                        </div>

                                    </div>
                                </div>
                            )
                        })
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty));
