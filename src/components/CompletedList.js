import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as CommonFunctions from '../actions/CommonFunctions';
import * as actions from '../actions';
import Task from './Task';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import SortIcon from 'material-ui/svg-icons/content/sort';
import CircularProgress from 'material-ui/CircularProgress';

class CompletedList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: '',
      popOverSort: false,
      gesture: false,
      gestureText: '',
      loading: false
    }
  }

  componentDidMount() {
    if(_.isEmpty(this.props.completed)) {
      this.setState({ loading: true }, () => {
        this.props.fetchTasks(2, "tuta", () => { // 1 is for incompleted tasks
          this.props.fetchSettings("tuta", () => {
            this.setState({ loading: false });
          });
        });
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if(this.state.sortBy !== nextProps.settings.sortBy) {
      this.setState({ sortBy: nextProps.settings.sortBy });
    }
  }

  editTask = (task) => {
    this.setState({ loading: true }, () => {
      this.props.setTask(2, "tuta", task, () => {
        setTimeout(() => {
          this.setState({ loading: false, gestureText: "Task Saved", gesture: true });
        }, 1000);
      });
    });
  }

  deleteTask = (task) => {
    this.setState({ loading: true }, () => {
      this.props.deleteTask(2, "tuta", task, () => {
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
          this.setState({ loading: false, gestureText: "Lets Get To Work!", gesture: true });
        }, 1000);
      });
    });
  }

  handleRequestClose = () => {
    this.setState({ gesture: false });
  };

  handleSortByChange = (e, value) => {
    this.setState({ loading: true, sortBy: value, popOverSort: false }, () => {
      const settings = {
        sortBy: this.state.sortBy
      };
      this.props.saveSettings("tuta", settings, () => {
        this.setState({ loading: false, gestureText: "Settings Saved Successfully", gesture: true });
      });
    });
  }

  handleSortOptionsClick = (event) => {
    event.preventDefault();
    this.setState({
      popOverSort: true,
      anchorEl: event.currentTarget
    });
  }

  handleRequestPopoverClose = () => {
    this.setState({ popOverSort: false });
  };

  renderList() {
    const completed = CommonFunctions.sortArray(this.props.completed, this.state.sortBy);
    // const { completed } = this.state;
    if (completed.length === 1)
      return (<div className="container container-fluid"><h2>No Tasks Completed Yet!</h2></div>);

    return (
      completed.map(task => {
        if (task.id !== 0) {
          return (<Task key={task.id} task={task} completed={true}
            editTask={this.editTask}
            deleteTask={this.deleteTask}
            completedOrReturn={this.completedOrReturn} />)
        }
        return <span key={task.id}/>;
      })
    );
  }

  render() {
    return(
      <div className="container container-fluid blue-font">

        <h1>Completed Tasks</h1>
        <MuiThemeProvider>
          <div>
            <RaisedButton className="pull-right" label="Sort By" icon={<SortIcon />}
              onClick={this.handleSortOptionsClick}
            />

            <Popover
              open={this.state.popOverSort}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              onRequestClose={this.handleRequestPopoverClose}
            >
              <Menu value={this.state.sortBy} onChange={this.handleSortByChange}>
                <MenuItem value="title" primaryText="Title" />
                <MenuItem value="deadLine_date" primaryText="Dead Line Date" />
                <MenuItem value="date_created" primaryText="Date Created" />
                <MenuItem value="priority" primaryText="Priority" />
              </Menu>
            </Popover>

            <br /><br />

          {this.state.loading ? <div className="center">
            <CircularProgress size={60} thickness={7} />
              </div>:<span />}
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
    completed: state.completed,
    settings: state.settings
  };
}

export default connect(mapStateToProps, actions)(CompletedList);
