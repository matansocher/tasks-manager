import _ from 'lodash';
import { FETCH_TASKS, ADD_TASK, DELETE_TASK } from '../actions/types';

export default function(state = [], action) {
  let newState = state;
  switch (action.type) {
    case FETCH_COMPLETED:
      // return action.payload;
    case MARK_AS_COMPLETED:
      // return _.concat(newState, action.payload);
    default:
      return state;
  }
}\
