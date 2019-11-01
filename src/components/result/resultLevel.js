import React from 'react';
import './result-level.css'
import store from '../../store/redux-store'
import { actSetLocalstorageData, getLocalstore } from '../../service/service'

export default class ResultLevel extends React.Component {

    constructor() {
        super();
     
        let getd = getLocalstore()
        let objset = {
            interestRate: 0,
            monthlyPayment: 0
        }
        if(getd) {
            objset.interestRate = getd.rate
            objset.monthlyPayment = getd.monthlyPayment
        }
        this.state = objset
    }
    componentWillMount() {
        store.subscribe( () => {
            console.log( 'My store has changed: State value =', store.getState() );
            let {amount, duration} = store.getState().info.input;
             let {interestRate, monthlyPayment} = store.getState().info.result;
             actSetLocalstorageData(amount, duration,interestRate, monthlyPayment.amount)
            this.setState({
                interestRate,
                monthlyPayment: monthlyPayment.amount
            })
        
    });
    }
    render() {
        return (
            <div class="output">
               <div class="item-output">
                    <h5 style={{marginRight: '12px'}}>interest rate: </h5> <h5>{this.state.interestRate}</h5>
               </div>
               <div class="item-output">
                    <h5 style={{marginRight: '12px'}}>monthly payment: </h5> <h5>{this.state.monthlyPayment}</h5>
               </div>
            </div>
        );
    }
 
}
