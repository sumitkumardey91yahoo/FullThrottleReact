
    export const actGetInterestMonth = async (amount, duration) => {
        if(!amount || !duration) {
           return new Error({error: 'invalid'})
        }
        amount = parseInt(amount)
        let url, response, result, jsonData

         url = `https://ftl-frontend-test.herokuapp.com/interest?amount=${amount}&numMonths=${duration}`;
       
        response  = await fetch(url)
        result = await response.json()
        jsonData =  {
             result,
             input: {
                amount,
                duration
             }
        }

        return jsonData;
    }

    export const actSetLocalstorageData = (amount, duration, rate, monthlyPayment) => {
        let dataset = [];
        duration = parseInt(duration)
        dataset = localStorage.getItem('set-loan-info') ? JSON.parse(localStorage.getItem('set-loan-info')) : [];
        dataset.unshift({amount, duration,rate, monthlyPayment});

        console.log("dataset", dataset)

        localStorage.setItem("set-loan-info", JSON.stringify(dataset))
    }

    export const getLocalstore = () => {
        let dataset = localStorage.getItem("set-loan-info") ? JSON.parse(localStorage.getItem("set-loan-info")) : ''
        if (dataset) {
            return dataset[0]
        }
        return false;
    
    }

