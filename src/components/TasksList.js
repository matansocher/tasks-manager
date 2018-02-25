import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchTasks, addTask, editTask, deleteTask, completedOrReturnToTasks } from '../actions';
import Task from './Task';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Snackbar from 'material-ui/Snackbar';

class TasksList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      gesture: false,
      gestureText: '',
      loading: false
    }
  }

  componentDidMount() {
    this.setState({ loading: true }, () => {
      if(_.isEmpty(this.state.tasks)) {
        this.props.fetchTasks("tuta", () => {
          this.setState({ loading: false });
        });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ loading: true }, () => {
      if (this.state.tasks !== nextProps.tasks) { // check if tasks array has changed
        const tasks = nextProps.tasks;
        this.setState({ tasks });
      }
      this.setState({ loading: false });
    });
  }

  editTask = (task) => {
    this.setState({ loading: true }, () => {
      this.props.editTask("tuta", task, () => {
        setTimeout(() => {
          this.setState({ loading: false, gestureText: "Task Saved", gesture: true });
        }, 1000);
      });
    });
  }

  deleteTask = (task) => {
    this.setState({ loading: true }, () => {
      this.props.deleteTask("tuta", task, () => {
        setTimeout(() => {
          this.setState({ loading: false, gestureText: "Task Deleted Successfully", gesture: true });
        }, 1000);
      });
    });
  }

  completedOrReturn = (task, type) => {
    this.setState({ loading: true } , () => {
      this.props.completedOrReturnToTasks(type, "tuta", task, () => { // type: 1 is to move to completed, 2 is to move back to todos
        setTimeout(() => {
          this.setState({ loading: false, gestureText: "Task Completed, Well Done", gesture: true });
        }, 1000);
      });
    });
  }

  handleAddClick = () => {
    this.props.history.push('/AddTask');
  }

  handleRequestClose = () => {
    this.setState({ gesture: false });
  };

  renderList() {
    const { tasks } = this.state;
    if (tasks.length === 1)
      return (<div className="container container-fluid"><h2>No Tasks Yet!</h2></div>);

    return (
      tasks.map(task => {
        const key = `${task.id}`;
        if (task.id !== 0) {
          return (<Task key={key} task={task} completed={false}
            editTask={this.editTask}
            deleteTask={this.deleteTask}
            completedOrReturn={this.completedOrReturn} />)
        }
        return <span key={key}/>;
      })
    );
  }

  render() {
    return(
      <div className="container container-fluid blue-font">

        <h1>Tasks</h1>
        <MuiThemeProvider>
          <div>
            {this.state.loading ? <CircularProgress size={60} thickness={7} /> : <span />}
            <Snackbar open={this.state.gesture} message={this.state.gestureText}
              autoHideDuration={4000} onRequestClose={this.handleRequestClose} />

            <FloatingActionButton className="float" onClick={this.handleAddClick}
              backgroundColor={'#D61D4C'}>
              <ContentAdd />
            </FloatingActionButton>

            {this.renderList()}
            <br /><hr /><br />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks
  };
}

export default connect(mapStateToProps, { fetchTasks, addTask, editTask, deleteTask, completedOrReturnToTasks })(TasksList);
