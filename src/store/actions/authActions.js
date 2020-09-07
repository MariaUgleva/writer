export const signIn = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({type: 'LOGIN_SUCCESS'});
        }).catch((err) => {
            dispatch({type: 'LOGIN_ERROR', err});
        })
    }
}

export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        
        firebase.auth().signOut().then(() => {
            dispatch({ type: 'SIGNOUT_SUCCESS'});
        });
    }
}
// firebase хранит все, что связано с аутентификацией пользователя
//  firestore хранит данные о проектах
export const signUp = (newUser) => {
     return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase(); 
        const firestore = getFirestore();
// создание нового пользователя в firebase
        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp) => {
            // хотим добавить в файрстор пользователя, но с его (уже сгенерированным) id из firebase
            //  также добавляем некоторые свойства к новому пользователю
           return firestore.collection('users').doc(resp.user.uid).set({
               firstName: newUser.firstName,
               lastName: newUser.lastName,
               initials: newUser.firstName[0] + newUser.lastName[0]

           })
        }).then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS'})
        }).catch((err) => {
            dispatch({ type: 'SIGNUP_ERR', err})
        })
     }
}