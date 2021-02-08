import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { ProductDetailsReducer, ProductReducer } from './reducers/productReducers'


const reducer = combineReducers({productList: ProductReducer,
productDetails: ProductDetailsReducer})
const initialState = {}
const middleWare = [thunk]
const Store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleWare)))


export default Store