export const INITIAL_STATE = {

    values:{
        nombre:'',
        descripcion:''
    },
    validated: false
};

export const formReducer = (state, action) => {

    switch(action.type){
        case "CHANGE_INPUT":
            return{
                ...state,
                values:{
                    ...state.values,
                    [action.payload.name]: action.payload.value
                }
                
            };
        case "CLEANUP":
            return {
                ...state,
                values:action.payload.values,
                validated:false
            }
        case "CHANGE_VALIDATED":
            return{
                ...state,
                validated: true
            }
        default:
            return state
    }
}