import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchTasks, addTask , deleteTask } from '../actions';
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
      loading: true
    }
  }

  componentDidMount() {
    const { tasks } = this.state;
    if(_.isEmpty(tasks) || _.isEmpty(settingsObject)) {
      this.props.fetchTasks();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ loading: true }, () => {
      if (this.props.tasks !== nextProps.tasks) { // check if tasks array has changed
        const tasks = nextProps.tasks;
        this.setState({ tasks });
      }
      this.setState({ loading: false });
    });
  }

  deleteTask = (task) => {
    this.setState({ loading: true }, () => {
      this.props.deleteTask(task, () => {
        setTimeout(() => {
          this.setState({ loading: false, gestureText: "Task Deleted Successfully", gesture: true });
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
          return (<Task key={key} task={task} deleteTask={this.deleteTask} />)
        }
        return <span key={key}/>;
      })
    );
  }

  render() {
    return(
      <div className="container container-fluid blue-font">

        <h1>Tasks List</h1>
        {this.state.loading ? <CircularProgress size={60} thickness={7} /> : <span />}
        <MuiThemeProvider>
          <div>
            <Snackbar open={this.state.gesture} message={this.state.gestureText}
              autoHideDuration={4000} onRequestClose={this.handleRequestClose} />

            <FloatingActionButton className="float" onClick={this.handleAddClick}>
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

export default connect(mapStateToProps, { fetchTasks, addTask , deleteTask })(TasksList);
