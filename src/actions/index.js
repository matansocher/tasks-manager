import _ from 'lodash';
import { FETCH_TASKS, ADD_TASK, EDIT_TASK, DELETE_TASK, FETCH_COMPLETED, MARK_AS_COMPLETED, RETURN_TO_TASKS } from '../actions/types';
import fire from '../config';

export function fetchTasks(username, callback) {
  return dispatch => {
    fire.database().ref(`${username}/tasks`).once('value', snap => {
      const tasksObject = snap.val();
      const array = _.values(tasksObject);
      callback();
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
    });
    callback();
    dispatch({
      type: ADD_TASK,
      payload: task
    });
  }
}

export function editTask(username, task, callback) {
  const { id, date_created, date_deadline, title, priority, description } = task;
  return dispatch => {
    fire.database().ref(`${username}/tasks/${id}`).set({
      id,
      date_created,
      date_deadline,
      title,
      priority,
      description
    });
    callback();
    dispatch({
      type: EDIT_TASK,
      payload: task
    });
  }
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
      callback();
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
