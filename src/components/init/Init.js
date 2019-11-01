import React, { Component } from 'react';
import UserInput from '../userInput/UserInput';
import Result from '../result/resultLevel';

export default class Init extends Component {
    
    render() {
       return ( 
        <div>
            <UserInput/>
            <Result/>
        </div>
       );
    }
}