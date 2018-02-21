import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchTasks, addTask } from '../actions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import Slider from 'material-ui/Slider';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import SaveIcon from 'material-ui/svg-icons/action/done';


class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      priority: 3,
      date: new Date().toJSON().slice(0,10),
      more: '',
      gesture: false,
      gestureText: '',
      loading: false
    };
  }

  componentDidMount() {
    console.log('mounted');
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({ loading: true });
  //   if ((this.props.time.year !== nextProps.time.year) ||
  //     (this.props.time.month !== nextProps.time.month)) { // check if date has changed
  //       this.props.fetchTasks(nextProps.time.year, nextProps.time.month);
  //   }
  //   if (this.props.tasks !== nextProps.tasktasks, settingsObject, loading: false });
  //   }
  //   this.setState({ loading: false });
  // }

  addTask = () => {
    this.setState({ loading: true }, () => {
      const { title, priority, date, more } = this.state;

      this.props.addTask({
        title,
        priority,
        date,
        more
      }, () => {
        setTimeout(() => {
          this.setState({ loading: false, gestureText: "Task Added Successfully!", gesture: true });
          this.props.history.push('/');
        }, 1000);
      });
    });
  }

  handleCancelClick = () => {
    this.props.history.push('/');
  }

  handleChange = (e) => {
    var change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }

  handlePriorityChange = (e, value) => {
    this.setState({ priority: value });
  }

  render() {
    const styles = {
      largeIcon: {
        width: 50,
        height: 50,
        color: '#031b42'
      }
    };
    return (
      <div className="container container-fluid blue-font">
        <h1>Add Task</h1>
        {this.state.loading ? <CircularProgress size={80} thickness={8} /> : <span />}
        <MuiThemeProvider>
          <div>
            <Snackbar open={this.state.gesture} message={this.state.gestureText}
              autoHideDuration={4000} onRequestClose={this.handleRequestClose} />
            <br />

            <textarea className="form-control" ref="title" name="title"
              value={this.state.title} onChange={this.handleChange} />
            <p>Title of the task</p>

            <Slider min={1} max={5} step={1}
              value={this.state.priority}
              onChange={this.handlePriorityChange} />
            <p>Pick the priority of the task</p>

            <textarea className="form-control" ref="more" name="more"
              value={this.state.more} onChange={this.handleChange} />
            <p>Write some more meaningfull description on the task</p>

            <ClearIcon style={styles.largeIcon} className="pull-left icon" onClick={this.handleCancelClick} />
            <SaveIcon style={styles.largeIcon} className="pull-right" onClick={this.addTask} />
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

export default connect(mapStateToProps, { addTask })(AddTask);
