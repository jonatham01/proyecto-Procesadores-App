import {types} from '../types/types';

const initialState={
    procesadores: [],
    procesadorActivo:null,
}

export const ProcesadorReducer= (state=initialState,action) =>{

    switch(action.type ){

        case types.procesadorSetActive:
            return{
                ...state,
                procesadorActivo: action.payload
            }


        case types.procesadorClearActive:
            return {
                ...state,
                procesadorActivo:null
            }

        case types.procesadorLoaded:
            return{
                state,
                procesadores: [ ...action.payload ]
            }

    
        case types.procesadorAddNew:
            return{
                ...state,
                procesadores: [
                    ...state.procesadores,
                    action.payload
                ]
            }
        
        case types.procesadorDeleted:
            return{
                ...state,
                procesadores: state.procesadores.filter(
                    e=> ( e.id !== state.procesadorActivo.id)
                ),
                procesadorActivo:null
            }

        case types.procesadorUpdated:
            return{
                ...state,
                //procesadores: [action.payload]
                procesadores: state.procesadores.map(
                   e => 
                    (e._id ==action.payload._id) ? action.payload : e
                   
                )
            }
        
        case types.procesadorLogout:
            return {
                ...initialState
            }
        

        default:
            return state;
    }
    


}