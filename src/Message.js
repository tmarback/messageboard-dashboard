import './Message.css';

import { Component } from "react";
import axios from 'axios';

import { endpoint } from './Config';

class Message extends Component {

    constructor( props ) {

        super( props );

        this.delete = this.delete.bind( this );

    }

    async setApproved( approved ) {

        const id = this.props.data.id;
        console.info( `Setting message ${id} to ${approved ? '' : 'not '}approved` );

        await axios.put( endpoint, {}, {
            params: {
                id: id,
                approve: approved,
            },
            headers: {
                'X-API-Key': this.props.apiKey
            }
        } ).catch( error => {
            const res = error.response;
            alert( `Error ${res.status}: ${res.data.message}` );
        } );

        this.props.reload();

    }

    async delete() {

        const id = this.props.data.id;
        const author = this.props.data.author.name;

        if ( !window.confirm( `Are you sure you want to delete message ${id} by ${author}?` ) ) {
            return;
        }

        const ban = window.confirm( "Press 'OK' if the user should be prevented from sending another message, or 'Cancel' if they should be allowed to resubmit." );
        
        console.info( `Deleting message ${id}` );

        await axios.delete( endpoint, {
            params: {
                id: id,
                ban: ban,
            },
            headers: {
                'X-API-Key': this.props.apiKey
            }
        } ).catch( error => {
            const res = error.response;
            alert( `Error ${res.status}: ${res.data.message}` );
        } );

        this.props.reload();

    }

    render() {

        const data = this.props.data;
        const approved = this.props.approved;

        const label = approved ? "❌" : "✔️";
        const handler = async () => await this.setApproved( !approved );

        const avatarLinks = data.author.avatar;
        const avatar = avatarLinks.length > 0 ? avatarLinks.map( ( a, i ) => <img key={i} src={a} alt="Avatar frame"/> ) : <label>(None)</label>;

        return (
            <div className="message">
                <div className="message-control">
                    <button onClick={handler}>{label}</button>
                    <button onClick={this.delete}>🗑️</button>
                </div>
                <div className="message-content">
                    <p><b>Author:</b> {data.author.name}</p>
                    <p><b>Submission time:</b> {data.timestamp}</p>
                    <p><b>Content:</b> {data.content}</p>
                    <p><b>Avatar:</b></p>
                    <div className="avatar">
                        {avatar}
                    </div>
                </div>
            </div>
        );

    }

}

export default Message;