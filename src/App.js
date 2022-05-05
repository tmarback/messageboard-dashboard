import './App.css';

import { Component } from 'react';
import update from 'immutability-helper';

import Control from './Control';
import MessageList from './MessageList';

class App extends Component {

    constructor( props ) {

        super( props );

        this.state = {
            apiKey: '',
            approved: false,
            page: 1,
            perPage: 10,
            pages: 0,
        };

        this.setApiKey = this.setApiKey.bind( this );
        this.setApproved = this.setApproved.bind( this );
        this.setPage = this.setPage.bind( this );
        this.setPerPage = this.setPerPage.bind( this );
        this.setPages = this.setPages.bind( this );
        
    }

    setApiKey( key ) {

        this.setState( update( this.state, { apiKey: { $set: key } } ) );

    }

    setApproved( approved ){

        this.setState( update( this.state, { approved: { $set: approved } } ) );

    }

    setPage( page ) {

        page = Math.min( page, this.state.pages )
        page = Math.max( page, 1 );
        this.setState( update( this.state, { page: { $set: page } } ) );

    }

    setPerPage( perPage ) {

        this.setState( update( this.state, { perPage: { $set: perPage } } ) );

    }

    setPages( pages ) {

        this.setState( update( this.state, { pages: { $set: pages } } ) );

    }
  
    render() {

        return (
            <div className="App">
                <Control 
                    apiKey={this.state.apiKey}
                    setApiKey={this.setApiKey}
                    approved={this.state.approved}
                    setApproved={this.setApproved}
                    page={this.state.page}
                    setPage={this.setPage}
                    perPage={this.state.perPage}
                    setPerPage={this.setPerPage}
                    pages={this.state.pages}
                />
                <MessageList
                    apiKey={this.state.apiKey}
                    approved={this.state.approved}
                    page={this.state.page}
                    setPage={this.setPage}
                    perPage={this.state.perPage}
                    pages={this.state.pages}
                    setPages={this.setPages}
                />
            </div>
        );

    }
}

export default App;
