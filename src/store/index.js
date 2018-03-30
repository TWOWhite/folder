import { createStore, applyMiddleware, compose } from 'redux';
import state from './reducer';
import {createImStore} from '../imStore';


export default createImStore(state);