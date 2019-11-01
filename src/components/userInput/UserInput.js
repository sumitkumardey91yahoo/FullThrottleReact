import React, { Component } from 'react';
import TextBox from './TextBox'
import Slider from '../slider/Slider'
import  config  from '../../config/prod-config'
import { getLocalstore } from '../../service/service'
export default class UserInput extends Component  {
    constructor() {
        super();
       
        this.state = {
            textbox : this.getFinalData(),
            slider: 0,
            textAmount: 0
        }
    }
    getFinalData() {
        let textData = config.textInput;
        let finalData = config.textInput;
        let getd = getLocalstore()
    
        if(getd) {
            let pos = [getd.amount, getd.duration]
            finalData = textData.map((d, index) => {
                 d.init = pos[index]
                 return d
            })
        }
        console.log(finalData)
        return finalData;
    }
    getText(dataset) {
        this.setState({textAmount: dataset.loan_amount} )
    }
    getSlider(value) {
        this.setState({slider: value})
    }
    render() {
        return (
            <div>
                <TextBox dataset={this.state.textbox}  sliderInput={this.state.slider} getTextInfo={this.getText.bind(this)} />
                <Slider getSliderValue={this.getSlider.bind(this)}  sendDataset={this.state.textAmount}></Slider>
            </div>
        )
    }
}