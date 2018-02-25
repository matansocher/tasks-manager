import _ from 'lodash';
import { EDIT_TASK, DELETE_TASK, FETCH_COMPLETED, MARK_AS_COMPLETED, RETURN_TO_TASKS } from '../actions/types';

export default function(state = [], action) {
  let newState = state;
  switch (action.type) {
    case DELETE_TASK:
      return _.without(newState, action.payload);
    case EDIT_TASK:
      const i = _.findIndex(state, o => o.id === action.payload.id );
      newState[i] = action.payload;
      return newState;
    case FETCH_COMPLETED:
      return action.payload;
    case MARK_AS_COMPLETED:
      return _.concat(newState, action.payload);
    case RETURN_TO_TASKS:
      return _.without(state, action.payload);
    default:
      return state;
  }
}
