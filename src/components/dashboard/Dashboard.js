import React, { Component } from 'react';
import Notifications from './Notifications';
import ProjectList from '../projects/ProjectList';
import { connect } from 'react-redux';
// конект с базой данных файрстора
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
// для перенаправления незарегистрированного пользователя на старницу с регистрацией
import { Redirect } from 'react-router-dom'

class Dashboard extends Component {
    render() {
        const { projects, auth } = this.props;
        // проверяем статус пользователя (зарег\незарег)
        if (!auth.uid) return <Redirect to='signin' />
        return (
            <div className='dashboard container'>
                <div className="row">
                    <div className="col s12 m6">
                        <ProjectList projects = {projects} />
                    </div>
                    <div className="col s12 m5 offset-m1">
                        <Notifications />
                    </div>
                </div>
            </div>
        )
    }
}
// кладет проекты в свойства Dashboard
const mapStateToProps = (state) => {
    return {
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth
    }
}
// подключаемся компонентом к файрстору и говорим к какой коллекции хотим иметь доступ
// для синхронизации нужен firestoreReducer в rootReducer
// compose положит все данные из firestore в state
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'projects'}
    ])
)(Dashboard);