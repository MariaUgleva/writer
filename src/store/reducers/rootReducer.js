import authReducer from './authReducer';
import projectReducer from './projectReducer';
import { combineReducers } from 'redux';
// синхронизация с файрстор
import { firestoreReducer } from 'redux-firestore';
// синсхонизация с файрбэйс
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
   auth: authReducer, 
   project: projectReducer,
   firestore: firestoreReducer,
   firebase: firebaseReducer
});

export default rootReducer;