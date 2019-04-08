import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Surveys from './Surveys';


class App extends React.Component{
    
    componentDidMount(){
        this.props.fetchUser();

    }
    render(){
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route path="/" exact component ={Landing} />
                        <Route path = "/surveys" exact component = {Surveys} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

export default connect(null, actions)(App);