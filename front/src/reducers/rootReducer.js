import { combineReducers } from 'redux';

//import { uiReducer } from './uiReducer';
import {  ProcesadorReducer } from './ProcesadorReducer';
import {uiReducer}  from  './uiReducer';


export const rootReducer = combineReducers({
    intel: ProcesadorReducer,
    ui:uiReducer
})

