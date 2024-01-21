import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { toast } from "react-toastify";

import { CommonUtils } from '../../../utils';
import { createNewClinic } from '../../../services/userService';
import './ManageClinic.scss';
const mdParser = new MarkdownIt(/* Markdown-it options */);



class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: ''
        }
    }

    async componentDidMount() { }

    async componentDidUpdate(prevProps, prevState, snapshot) { }

    showHideDetaiInfor = (status) => { }

    handleOnChangeInput = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleChangeMarkdown = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text
        })
    }

    handleOnChangeImg = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            this.setState({
                imageBase64: base64
            })
        }
    }

    handleSaveNewClinic = async () => {
        let { name, descriptionHTML, descriptionMarkdown, imageBase64, address } = this.state;
        let res = await createNewClinic({ name, address, descriptionHTML, descriptionMarkdown, imageBase64 })
        if (res && res.errCode === 0) {
            toast.success("Add new clinic succeeds!!!!")
        } else {
            toast.error('Something went wrong')
        }
    }

    render() {
        return (
            <div className='manage-specialty-container'>
                <div className='ms-title'>Quản lý phòng khám</div>
                <div className='add-new-specialty row'>
                    <div className='col-6 form-group'>
                        <label>Tên phòng khám</label>
                        <input
                            className='form-control'
                            value={this.state.name}
                            onChange={(e) => this.handleOnChangeInput(e, 'name')}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Ảnh phòng khám</label>
                        <input
                            type='file'
                            className='form-control-file'
                            onChange={(e) => this.handleOnChangeImg(e)}
                        />
                    </div>

                    <div className='col-6 form-group'>
                        <label>Địa chỉ phòng khám</label>
                        <input
                            className='form-control'
                            value={this.state.address}
                            onChange={(e) => this.handleOnChangeInput(e, 'address')}
                        />
                    </div>

                    <div className='col-12'>
                        <MdEditor
                            style={{ height: '300px' }}
                            renderHTML={text => mdParser.render(text)}
                            value={this.state.descriptionMarkdown}
                            onChange={this.handleChangeMarkdown}
                        />
                    </div>
                    <div className='col-12'>
                        <button
                            className='btn-save-specialty'
                            onClick={() => this.handleSaveNewClinic()}
                        >
                            save
                        </button>
                    </div>
                </div>
                <div className='all-specialty'></div>


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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
