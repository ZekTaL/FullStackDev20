import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({ notes: noteReducer, filter: filterReducer})

const store = createStore(reducer, composeWithDevTools())

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,  
    document.getElementById('root')
)
