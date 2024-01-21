import React, { Component } from 'react';
import { connect } from 'react-redux';


class About extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    render() {
        return (
            <div className=' section-share section-about'>
                <div className='section-about-header'>Truyền thông nói về Booking Care</div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="100%" height="400px"
                            src="https://www.youtube.com/embed/FyDQljKtWnI?si=kcaB2hr1Nfd0XPzz"
                            title="YouTube video player"
                            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen>
                        </iframe>
                    </div>
                    <div className='content-right'>
                        <p>CHƯA LÊN Ý TƯỞNG</p>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {  // gần giống UseSelector
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};



export default connect(mapStateToProps)(About);
