import { combineReducers } from 'redux';
import Tasks from './reducer_tasks';
import Completed from './reducer_completed';

const rootReducer = combineReducers({
  tasks: Tasks,
  completed: Completed
});

export default rootReducer;
