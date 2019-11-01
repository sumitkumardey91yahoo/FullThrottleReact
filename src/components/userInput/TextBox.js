import React, { Component } from 'react';
import './text-box.css'
import { actGetInterestMonth } from '../../service/service'
import store from '../../store/redux-store'
import config from '../../config/prod-config';

export default class TextBox extends Component {
    constructor() {
        super();
        this.state = {
            errorMessage: '',
            errorMessageMonth: ''
        }
    }
    initState() {
        
        let obj = {}
        this.props.dataset.map((item) => {
           return obj[item.key] = item.init
        })

        this.setState(obj)
    }

    componentWillReceiveProps(props) {
        if(!props.sliderInput || (this.props.sliderInput === props.sliderInput)) return
            this.setState ({
                loan_amount: props.sliderInput
            }, (old) => {
                if(!this.validationTxt())
                    this.actRequestServeice()
            })
    }
    changeVal(e ,key) {
        let obj = {};
        obj[key] = e.target.value
        this.setState(obj, () => {
            if(!this.validationTxt())
                this.actRequestServeice()
        })

        this.props.getTextInfo(obj)
    }
    validationTxt() {
        console.log("validation", this.state)
        let {loan_amount, loan_duration} = this.state;
        let status = false;
        loan_amount = loan_amount ? parseInt(loan_amount) : 0
        loan_duration = loan_duration ? parseInt(loan_duration) : 0

        
        if(loan_duration >= config.monthStart && loan_duration <=  config.monthEnd) {
           
            this.setState({errorMessageMonth: ''})
        } else {
            this.setState({errorMessageMonth: config.errorMonth} , () => {
                console.log("r", config.errorMonth)
                console.log(this.state.errorMessage)
            })
            
            status = true
        }
         
        if(loan_amount >= config.amountRangestart && loan_amount <=  config.amountRangeEnd) {
           this.setState({errorMessage: ''})
        } else {
            this.setState({errorMessage: config.errorAmount})
            status = true
            
        }
        return status;
    }
    actRequestServeice(data) {
            let {loan_amount, loan_duration} = this.state;
            actGetInterestMonth(loan_amount, loan_duration).then((response) => {
                store.dispatch({
                    type: 'getResponseAmountMonth',
                    payload: response
                });
            }, (error) => {

            })

    }
    componentWillMount() {
        this.initState();
    }
    render() {
        return (
            <React.Fragment>
                
                <div className="main-text">
                { this.props.dataset.map((tbox) => 
                <div class="t-box-div">
                        <h5> {tbox.name}</h5>
                        <input type="text"  key={tbox.key} value={this.state[tbox.key]} onChange={(e) => this.changeVal(e, tbox.key)} />
                    </div>
                    )}
                </div>
                <p>{this.state.errorMessage}</p>
                <p>{this.state.errorMessageMonth}</p>
            </React.Fragment>
            )
        }
}