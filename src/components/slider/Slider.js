import React, { Component } from 'react';
import './slider-style.css'
import  config  from '../../config/prod-config'
import { getLocalstore } from '../../service/service'
export default class Slider extends Component  {
    constructor(props) {
        super(props);
        
        this.amountRangestart = config.amountRangestart;
        this.amountRangeEnd = config.amountRangeEnd;
        let getd = getLocalstore()
        let data = ''
    
        if(getd) {
            data = getd.amount
        }

        this.state = {
            data: data ? data : this.amountRangestart
        }

    }
    
    initRange(event) {
        this.setState({
            data: event.target.value
        },() => {
            this.props.getSliderValue(this.state.data)
        });
        
    }
    componentWillReceiveProps(props) {
        let { sendDataset } = props;
        if(props.sendDataset !== this.props.sendDataset) {
       
            this.setState({data: sendDataset})
        }
        
    }
    render() {
        return (
            <div style={{textAlign: 'center', marginTop: '32px'}}>
                <div class="slidecontainer"> min: {this.amountRangestart}
                    <input type="range" min={this.amountRangestart} max={this.amountRangeEnd} value={this.state.data} class="slider" id="myRange" step="1" onChange={this.initRange.bind(this)}/>
                    max: {this.amountRangeEnd}
                    <p>value: <span id="demo">{this.state.data}</span></p>
                </div> 
            </div>
        )
    }
}