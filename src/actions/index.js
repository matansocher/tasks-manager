import _ from 'lodash';
import { FETCH_TASKS, ADD_TASK, EDIT_TASK, DELETE_TASK, FETCH_COMPLETED, MARK_AS_COMPLETED, RETURN_TO_TASKS } from '../actions/types';
import fire from '../config';

export function fetchDays(year, month, callback) {
  const settings_ref = fire.database().ref(`days/${year}/${month}/settings`);
  fire.database().ref(`days/${year}/${month}`).once('value', snap => {
    // if no settings object exists - create empty one
    if (!snap.hasChild('settings')) {
      settings_ref.set({
        day: 0,
        month
      }).then(() => {
        return dispatch => {
          fire.database().ref(`days/${year}/${month}`).on('value', snap => {
            const daysObject = snap.val();
            const array = _.values(daysObject);
            dispatch({
              type: FETCH_TASKS,
              payload: array
            });
          });
        };
      });
    }
  });

  return dispatch => {
    fire.database().ref(`days/${year}/${month}`).on('value', snap => {
      const daysObject = snap.val();
      const array = _.values(daysObject);
      dispatch({
        type: FETCH_TASKS,
        payload: array
      });
    });
  };
}

export function fetchTasks(username, callback) {
  return dispatch => {
    fire.database().ref(`${username}/tasks`).once('value', snap => {
      const tasksObject = snap.val();
      const array = _.values(tasksObject);
      dispatch({
        type: FETCH_TASKS,
        payload: array
      });
    });
  }
}

export function addTask(username, task, callback) {
  const { id, date_created, date_deadline, title, priority, description } = task;
  return dispatch => {
    fire.database().ref(`${username}/tasks/${id}`).set({
      id,
      date_created,
      date_deadline,
      title,
      priority,
      description
    })
    callback();
    dispatch({
      type: ADD_TASK,
      payload: task
    });
  }
}

export function editTask(username, task, callback) {
  const { id, date_created, date_deadline, title, priority, description } = task;
  // return dispatch => {
    fire.database().ref(`${username}/tasks/${id}`).set({
      id,
      date_created,
      date_deadline,
      title,
      priority,
      description
    }).then(() => {
      callback();
      return {
        type: EDIT_TASK,
        payload: task
      }
    });
    // callback();
    // dispatch({
    //   type: ADD_TASK,
    //   payload: task
    // });
  // }
}

export function deleteTask(username, task, callback) {
  return dispatch => {
    fire.database().ref(`${username}/tasks/${task.id}`).remove();
    callback();
    dispatch({
      type: DELETE_TASK,
      payload: task
    });
  }
}

export function fetchCompleted(username, callback) {
  return dispatch => {
    fire.database().ref(`${username}/completed`).once('value', snap => {
      const tasksObject = snap.val();
      const array = _.values(tasksObject);
      dispatch({
        type: FETCH_COMPLETED,
        payload: array
      });
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
  const { id, date_created, date_deadline, title, priority, description } = task;
  return dispatch => {
     // delete from tasks/completed
    fire.database().ref(`${username}/${toRemove}/${id}`).remove().then(() => {
      // add to opposite tasks/completed
      fire.database().ref(`${username}/${toAdd}/${id}`).set({
        id,
        date_created,
        date_deadline,
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
