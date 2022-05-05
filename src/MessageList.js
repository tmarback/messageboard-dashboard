import './MessageList.css'

import { Component } from "react";
import axios from "axios";
import { Async } from "react-async";

import { endpoint } from './Config';
import Message from "./Message";

class MessageList extends Component {

    constructor( props ) {

        super( props );

        this.state = {
            reload: false
        }

        this.loadPage = this.loadPage.bind( this );
        this.stateChanged = this.stateChanged.bind( this );
        this.reload = this.reload.bind( this );

    }

    async loadPage() {

        const apiKey = this.props.apiKey;
        const approved = this.props.approved;
        const page = this.props.page;
        const pageSize = this.props.perPage;

        if ( !apiKey ) {
            throw new Error( "The API key must be provided." );
        }

        return await axios.get( endpoint, {
            params: {
                page: page,
                pageSize: pageSize,
                pending: !approved
            },
            headers: {
                'X-API-Key': apiKey
            }
        } ).then( res => {
            const pages = res.data.pageCount;
            if ( pages !== this.props.pages ) {
                this.props.setPages( pages );

                if ( pages === 0 ) {
                    if ( page > 1 ) {
                        this.props.setPage( 1 );
                    }
                } else {
                    if ( page >= pages ) {
                        this.props.setPage( pages );
                    }
                }
            }
            return res.data.pageData;
        } ).catch( error => {
            if ( page !== 0 ) {
                this.props.setPage( 1 );
            }
            throw error;
        } );

    }

    stateChanged( props, prevProps ) {

        if ( this.state.reload ) {
            this.setState({
                reload: false
            });
            return true;
        }

        const cur = props.state;
        const prev = prevProps.state;

        return cur.apiKey !== prev.apiKey
                || cur.approved !== prev.approved
                || cur.page !== prev.page
                || cur.perPage !== prev.perPage;

    }

    reload() {

        console.debug( "Reloading" );
        this.setState({
            reload: true
        });

    }

    render() {

        return (
            <div>
                <Async promiseFn={this.loadPage} watchFn={this.stateChanged} state={this.props}>
                    <Async.Pending>Loading...</Async.Pending>
                    <Async.Fulfilled>
                        {data => {
                            if ( !data ) {
                                return ( <span>No data.</span> );
                            } else {
                                const messages = data.map( d => <Message key={d.id} data={d} approved={this.props.approved} apiKey={this.props.apiKey} reload={this.reload}/> );
                                return ( <div>{messages}</div> );
                            }
                        }}
                    </Async.Fulfilled>
                    <Async.Rejected>
                        {error => {

                            if ( error.response ) {
                                if ( error.response.status === 404 ) {
                                    return "No messages.";
                                } else {
                                    return `Error ${error.response.status}: ${error.response.data.message}`;
                                }
                            } else if ( error.request ) {
                                console.error( error.message );
                                return "Server failed to respond.";
                            } else {
                                console.error( error.message );
                                return error.message;
                            }

                    }}
                    </Async.Rejected>
                </Async>
                <div className="page-buttons">
                    <button onClick={this.reload}>Reload</button>
                </div>
                
            </div>
        );

    }

}

export default MessageList;