import { combineReducers } from 'redux';
import Tasks from './reducer_tasks';
import Completed from './reducer_completed';
import CurrentTask from './reducer_current_task';

const rootReducer = combineReducers({
  tasks: Tasks,
  completed: Completed,
  currentTask: CurrentTask
});

export default rootReducer;
