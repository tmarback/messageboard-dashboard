import './PageControl.css';

import { Component } from "react";

class PageControl extends Component {

    constructor( props ){

        super( props );

        this.handlePage = this.handlePage.bind( this );
        this.handlePrevious = this.handlePrevious.bind( this );
        this.handleNext = this.handleNext.bind( this );

    }

    handlePage( e ) {

        const page = e.target.value;
        this.props.setPage( page );

    }

    handlePrevious( e ) {

        e.preventDefault();
        this.props.setPage( this.props.page - 1 );

    }

    handleNext( e ) {

        e.preventDefault();
        this.props.setPage( this.props.page + 1 );

    }

    render() {

        return (
            <span className="control-element">
                <button onClick={this.handlePrevious}>&lt;</button>
                <label className="paging">
                    <input className="paging" type="text" inputMode="numeric" value={this.props.page} onChange={this.handlePage}/>
                    /{this.props.pages}
                </label>
                <button onClick={this.handleNext} className="rightNav">&gt;</button>
            </span>
        );

    }

}

export default PageControl