import './Control.css';

import React, { Component } from 'react';
import Toggle from 'react-toggle';
import "react-toggle/style.css";

import PageControl from './PageControl';

class Control extends Component {

    constructor( props ) {

        super( props );

        this.handleKey = this.handleKey.bind( this );
        this.handleToggle = this.handleToggle.bind( this );
        this.handlePerPage = this.handlePerPage.bind( this );

    }

    handleKey( e ) {

        const key = e.target.value;
        this.props.setApiKey( key );

    }

    handleToggle( e ) {

        const approved = e.target.checked;
        this.props.setApproved( approved );

    }

    handlePerPage( e ) {

        const perPage = e.target.value;
        this.props.setPerPage( perPage );

    }

    render() {

        return (
            <form>
                <label className='control-element'>
                    API Key:
                    <input type="text" value={this.props.apiKey} onChange={this.handleKey}/>
                </label>
                <label className='control-element'>
                    Pending
                    <Toggle
                        checked={this.props.approved}
                        onChange={this.handleToggle}
                    />
                    Approved
                </label>
                <PageControl
                    page={this.props.page}
                    setPage={this.props.setPage}
                    pages={this.props.pages}
                />
                <label className='control-element'>
                    Entries per page:
                    <select value={this.props.perPage} onChange={this.handlePerPage}>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </label>
            </form>
        );

    }

}

export default Control