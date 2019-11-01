import stateInit from './state'
const reducer = function ( state = stateInit , action ) {

	switch(action.type) {
		case 'getResponseAmountMonth': 
			state.info = action.payload
			break;
		default: 
	}
	return  state;
};

export default reducer;