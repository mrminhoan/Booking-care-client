import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Specialty.scss';
import Slider from 'react-slick';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';

import { getAllSpecialty } from '../../../services/userService';

class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: []
    };
  }

  async componentDidMount() {
    let res = await getAllSpecialty();
    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialty: res.data ? res.data : []
      });
    }
  }

  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  handleViewDetailSpecialty = (item) => {
    if (this.props.history)
      this.props.history.push(`/detail-specialty/${item.id}`);
  };

  render() {
    let { dataSpecialty } = this.state;
    return (
      <div className=" section-share section-specialty">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id={'homepage.specialty-popular'} />
            </span>
            <button className="btn-section">
              <FormattedMessage id={'homepage.more-infor'} />
            </button>
          </div>
          <div className="section-body">
            {dataSpecialty && dataSpecialty.length > 0 ? (
              <Slider {...this.props.settings}>
                {dataSpecialty &&
                  dataSpecialty.length > 0 &&
                  dataSpecialty.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="section-customize specialty-child"
                        onClick={() => this.handleViewDetailSpecialty(item)}
                      >
                        <div
                          className="bg-img section-specialty"
                          style={{ backgroundImage: `url(${item.image})` }}
                        />
                        <div className="specialty-name">{item.name}</div>
                      </div>
                    );
                  })}
              </Slider>
            ) : (
              <FormattedMessage id={'note.server-is-starting'} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // gần giống UseSelector
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language
  };
};

export default withRouter(connect(mapStateToProps)(Specialty));
