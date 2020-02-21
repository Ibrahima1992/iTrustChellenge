import * as types from '../constants/types';
import update from 'immutability-helper';

export const initialState = {
    events : []
}

export const reducer = (state = initialState, action) => {
    switch(action.type) {
        case types.ACTION_ADD_AVENT:{
            return ({...state, events : [...state.events,{...action.payload,id : ++state.events.length}]})
        }        
        case types.ACTION_DELETE_AVENT:{
            return ({...state, events : update(state.events, arr => arr.filter(item => item.id !== action.payload.id) )})
        }        
        case types.ACTION_UPDATE_AVENT:{
            return ({...state, events : update(state.events, arr => arr.map(item => item.id === action.payload.id ? {...action.payload,id : item.id} : item) )})
        }
        default:
            return state;
    } 
}