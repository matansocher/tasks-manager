import _ from 'lodash';
import { FETCH_TASKS, ADD_TASK, EDIT_TASK, DELETE_TASK, FETCH_COMPLETED, MARK_AS_COMPLETED, RETURN_TO_TASKS, SAVE_TASK, FETCH_SETTINGS, SAVE_SETTINGS } from '../actions/types';
import fire from '../config';

export function fetchTasks(type, username, callback) { // 1 is tasks, 2 is completed
  const TYPE = type === 1 ? FETCH_TASKS : FETCH_COMPLETED;
  const list = type === 1 ? 'tasks' : 'completed';
  return dispatch => {
    fire.database().ref(`${username}/${list}`).orderByChild('priority').once('value', snap => {
      const tasksObject = snap.val();
      const array = _.values(tasksObject);
      callback();
      dispatch({
        type: TYPE,
        payload: array
      });
    });
  }
}

export function setTask(type, username, task, callback) { // 1 is to add, 2 is to edit
  const TYPE = type === 1 ? ADD_TASK : EDIT_TASK;
  const list = type === 1 ? 'tasks' : 'completed';
  const { id, date_created, date_deadline, time_deadline, title, priority, description } = task;
  return dispatch => {
    fire.database().ref(`${username}/${list}/${id}`).set({
      id,
      title,
      priority,
      description,
      date_created,
      date_deadline,
      time_deadline
    });
    callback();
    dispatch({
      type: TYPE,
      payload: task
    });
  }
}

export function deleteTask(type, username, task, callback) {
  const list = type === 1 ? 'tasks' : 'completed';
  return dispatch => {
    fire.database().ref(`${username}/${list}/${task.id}`).remove().then(() => {
      callback();
    });;
    dispatch({
      type: DELETE_TASK,
      payload: task
    });
  }
}

export function completedOrReturnToTasks(type, username, task, callback) {
  let TYPE;
  let toAdd;
  let toRemove;

  if(type === 1) { // add to completed
    TYPE = MARK_AS_COMPLETED;
    toAdd = 'completed';
    toRemove = 'tasks';
  } else { // add to tasks again
    TYPE = RETURN_TO_TASKS;
    toAdd = 'tasks';
    toRemove = 'completed';
  }
  const { id, date_created, date_deadline, time_deadline, title, priority, description } = task;
  return dispatch => {
     // delete from tasks/completed
    fire.database().ref(`${username}/${toRemove}/${id}`).remove().then(() => {
      // add to opposite tasks/completed
      fire.database().ref(`${username}/${toAdd}/${id}`).set({
        id,
        date_created,
        date_deadline,
        time_deadline,
        title,
        priority,
        description
      })
    });

    callback();
    dispatch({
      type: TYPE,
      payload: task
    });
  }
}

export function saveCurrentTask(task) {
  if(!task) {
    task = {
      id: '',
      title: '',
      priority: 3,
      date_created: null,
      date_deadline: null,
      time_deadline: null,
      description: ''
    };
  }

  return {
    type: SAVE_TASK,
    payload: task
  }
}

export function fetchSettings(username, callback) {
  const settings_ref = fire.database().ref(`${username}/settings`);
  // if no settings object exists - create empty one
  fire.database().ref(`${username}`).once('value', snap => {
    if (!snap.hasChild('settings')) {
      settings_ref.set({
        sortBy: 'priority'
      }).then(() => {
        return dispatch => {
          settings_ref.on('value', snap => {
            dispatch({
              type: FETCH_SETTINGS,
              payload: snap.val()
            });
          });
        }
      });
    }
  });

  return dispatch => {
    settings_ref.on('value', snap => {
      callback();
      dispatch({
        type: FETCH_SETTINGS,
        payload: snap.val()
      });
    });
  };
}

export function saveSettings(username, settings, callback) {
  const { sortBy } = settings;
  return dispatch => {
    fire.database().ref(`${username}/settings`).set({
      sortBy
    });
    callback();
    dispatch({
      type: SAVE_SETTINGS,
      payload: settings
    });
  }
}
