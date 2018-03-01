import { SAVE_TASK } from '../actions/types';

const initialTimeState = {
  id: '',
  title: '',
  priority: 3,
  date_created: null,
  date_deadline: null,
  time_deadline: null,
  description: ''
}

export default function(state = initialTimeState, action) {
  switch (action.type) {
    case SAVE_TASK:
      return action.payload;
    default:
      return state;
  }
}
