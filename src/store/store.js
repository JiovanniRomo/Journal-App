import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { authReducer } from '../components/reducers/authReducer';
import { uiReducer } from '../components/reducers/uiReducer';
import { notesReducer } from '../components/reducers/notesReducer';
import thunk from 'redux-thunk';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

//Combinamos los reducers de las funcionalidades
const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer,
});

export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

