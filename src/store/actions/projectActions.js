// thunk из index.js позволяет вернуть в экшне функцию
export const createProject = (project) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // дает ссылку на наш firestore
        const firestore = getFirestore();
        // берем данные о пользователе из стэйта
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        // добавляем данные со страницы в database
        firestore.collection('projects').add({
            ...project,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date()

        }).then(() => {
            dispatch({ type: 'CREATE_PROJECT', project: project });
        }).catch((err) => {
            dispatch({type: 'CREATE_PROJECT_ERROR', err})
        })
    }
};