const config = {
    monthStart: 6,
    monthEnd: 24,
    amountRangestart: 500,
    amountRangeEnd: 5000,
    errorMonth: 'month should be in between 6 to 24',
    errorAmount: 'amount should be in between 500 to 5000'

}
config.textInput = [{
        name: "loan amount",
        key: "loan_amount",
        init: config.amountRangestart
    },
    {
        name: "loan duration",
        key: "loan_duration",
        init: config.monthStart
    }];
  
    export default config

