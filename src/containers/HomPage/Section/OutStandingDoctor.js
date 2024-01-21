import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
class OutStandingDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctors: []
        }
    }

    componentDidMount() {
        let limit = 10;
        this.props.loadTopDoctors(limit);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorRedux !== this.props.topDoctorRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorRedux
            })
        }
    }

    handleViewDetailDoctor = doctor => {
        this.props.history.push(`/detail-doctor/${doctor.id}`)
    }

    render() {
        let arrDoctors = this.state.arrDoctors;
        let { language } = this.props;
        // arrDoctors = arrDoctors.concat(arrDoctors).concat(arrDoctors);
        return (
            <div className=' section-share section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id={"homepage.out-standing-doctor"} /></span>
                        <button className='btn-section'><FormattedMessage id={"homepage.more-infor"} /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>

                            {
                                arrDoctors && arrDoctors.length > 0 &&
                                arrDoctors.map((doctor, index) => {
                                    let imageBase64;
                                    if (doctor.image) {
                                        imageBase64 = new Buffer(doctor.image, 'base64').toString('binary');
                                    }
                                    let nameVi = `${doctor.positionData.valueVi}, ${doctor.firstName} ${doctor.lastName}`;
                                    let nameEn = `${doctor.positionData.valueEn}, ${doctor.firstName} ${doctor.lastName}`;

                                    return (
                                        <div className='section-customize' key={index} onClick={() => this.handleViewDetailDoctor(doctor)}>
                                            <div className='customize-border'>
                                                <div className='outer-bg'>
                                                    <div
                                                        className='bg-img section-outstanding-doctor'
                                                        style={{ backgroundImage: `url(${imageBase64})` }}
                                                    />
                                                </div>
                                                <div className='position text-center'>
                                                    <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                    <div>Cơ xương khớp 1 </div>
                                                </div>
                                            </div>
                                        </div>

                                    )
                                })
                            }

                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctorRedux: state.admin.top_doctors,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: (limit) => dispatch(actions.fetchTopDoctor(limit)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
