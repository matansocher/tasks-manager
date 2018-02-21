import _ from 'lodash';
import { FETCH_TASKS, ADD_TASK, DELETE_TASK, FETCH_COMPLETED, MARK_AS_COMPLETED } from '../actions/types';
import fire from '../config';

export function fetchTasks(year, month, callback) {
  fire.database().ref(`tuta`).once('value', snap => {

  return dispatch => {
    fire.database().ref(`tuta`).on('value', snap => {
      const tasksObject = snap.val();
      const array = _.values(tasksObject);
      dispatch({
        type: FETCH_TASKS,
        payload: array
      });
    });
  };
}

export function addTask(task, callback) {
  const { id, date, title, priority, more } = task;
  return dispatch => {
    fire.database().ref(`tuta/${task.id}`).set({
      id,
      date,
      title,
      priority,
      more
    });
    callback();
    dispatch({
      type: ADD_TASK,
      payload: task
    });
  };
}

export function deleteTask(task, callback) {
  return dispatch => {
    fire.database().ref(`tuta/${task.id}`).remove();
    callback();
    dispatch({
      type: DELETE_TASK,
      payload: task
    });
    }
}

export function markAsFinished(task, callback) {
  // delete from tasksObject
  // add to completed
  callback();
  dispatch({
    type: MARK_AS_FINISHED,
    payload: task
  });
}
