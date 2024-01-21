import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import ManageScheduler from '../containers/System/Doctor/ManageScheduler';
import ManagePatient from '../containers/System/Doctor/ManagePatient';

import Header from '../containers/Header/Header';
class Doctor extends Component {
    render() {
        let { isLoggedIn } = this.props
        return (
            <>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/doctor/manage-scheduler" component={ManageScheduler} />
                            <Route path="/doctor/manage-patient" component={ManagePatient} />

                        </Switch>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
