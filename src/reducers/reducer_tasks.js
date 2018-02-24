import _ from 'lodash';
import { FETCH_TASKS, ADD_TASK, EDIT_TASK, DELETE_TASK, MARK_AS_COMPLETED, RETURN_TO_TASKS } from '../actions/types';

export default function(state = [], action) {
  let newState = state;
  switch (action.type) {
    case FETCH_TASKS:
      return action.payload;
    case ADD_TASK:
      return _.concat(newState, action.payload);
    case EDIT_TASK:
      break;
      // return _.concat(newState, action.payload);
    case DELETE_TASK:
      return _.without(newState, action.payload);
    case MARK_AS_COMPLETED:
      return _.without(newState, action.payload);
    case RETURN_TO_TASKS:
      return _.concat(newState, action.payload);
    default:
      return state;
  }
}
