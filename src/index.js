import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './store/reducers/rootReducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createFirestoreInstance, getFirestore, reduxFirestore } from 'redux-firestore'
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase'
import fbConfig from './config/fbConfig'
import firebase from 'firebase/app'
// браузер при рендере ждет ответа от файрсотра о статусе пользователя
import { useSelector } from 'react-redux'
import { isLoaded } from 'react-redux-firebase'

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
        reduxFirestore(firebase, fbConfig)
    )
);
// для синхронизации профиля и данных
const profileSpecificProps = {
    // коллекция откуда нужно взять данные
    userProfile: 'users',
    // firebase должен использовать firestore для синхронизации профиля
    useFirestoreForProfile: true,
    enableRedirectHandling: false,
    resetBeforeLogin: false
}

const rrfProps = {
    firebase,
    config: fbConfig,
    config: profileSpecificProps,
    dispatch: store.dispatch,
    createFirestoreInstance,
    // браузер при рендере ждет ответа от файрсотра о статусе пользователя
    userProfile: 'users',
    presence: 'presence',
    sessions: 'sessions'
};
// браузер при рендере ждет ответа от файрсотра о статусе пользователя
function AuthIsLoaded({ children }) {
    const auth = useSelector(state => state.firebase.auth)
    if (!isLoaded(auth)) return <div>Loding Screen</div>;
    return children
}

ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <AuthIsLoaded>
                <App />
            </AuthIsLoaded>
        </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById("root")
);


serviceWorker.unregister(); 
