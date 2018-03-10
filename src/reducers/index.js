import { combineReducers } from 'redux';
import Tasks from './reducer_tasks';
import Completed from './reducer_completed';
import CurrentTask from './reducer_current_task';
import Settings from './reducer_settings';

const rootReducer = combineReducers({
  tasks: Tasks,
  completed: Completed,
  currentTask: CurrentTask,
  settings: Settings
});

export default rootReducer;
