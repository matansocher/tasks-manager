import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchCompleted, editTask, deleteTask, completedOrReturnToTasks } from '../actions';
import Task from './Task';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';

class CompletedList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: [],
      gesture: false,
      gestureText: '',
      loading: false
    }
  }

  componentDidMount() {
    this.setState({ loading: true }, () => {
      if(_.isEmpty(this.state.completed)) {
        this.props.fetchCompleted("tuta");
      }
    });
    this.setState({ loading: false });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ loading: true }, () => {
      if (this.state.completed !== nextProps.completed) { // check if tasks array has changed
        const completed = nextProps.completed;
        this.setState({ completed });
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
      this.props.completedOrReturnToTasks(type, "tuta", task, () => { // 1 is to move to completed, 2 is to move back to todos
        setTimeout(() => {
          this.setState({ loading: false, gestureText: "Task Completed, Well Done", gesture: true });
        }, 1000);
      });
    });
  }

  renderList() {
    const { completed } = this.state;
    if (completed.length === 1)
      return (<div className="container container-fluid"><h2>No Tasks Completed Yet!</h2></div>);

    return (
      completed.map(task => {
        const key = `${task.id}`;
        if (task.id !== 0) {
          return (<Task key={key} task={task} completed={true}
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

        <h1>Completed Tasks</h1>
        <MuiThemeProvider>
          <div>
            {this.state.loading ? <CircularProgress size={60} thickness={7} /> : <span />}
            <Snackbar open={this.state.gesture} message={this.state.gestureText}
              autoHideDuration={4000} onRequestClose={this.handleRequestClose} />

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
    completed: state.completed
  };
}

export default connect(mapStateToProps, { fetchCompleted, editTask, deleteTask, completedOrReturnToTasks })(CompletedList);
