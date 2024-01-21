import React, { Component } from 'react';
import { connect } from 'react-redux';


class HomeFooter extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    render() {
        return (
            <div className='home-footer'>
                <p>&copy; 2023 Booking Care VMH.</p>
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



export default connect(mapStateToProps)(HomeFooter);
