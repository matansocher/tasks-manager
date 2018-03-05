import React, { Component } from 'react';
import * as CommonFunctions from '../actions/CommonFunctions';
import { connect } from 'react-redux';
import { setTask } from '../actions';
import { makeID } from '../actions/CommonFunctions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import Slider from 'material-ui/Slider';
import Snackbar from 'material-ui/Snackbar';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import BackIcon from 'material-ui/svg-icons/navigation/chevron-left';
import TextField from 'material-ui/TextField';

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      title: '',
      priority: 3,
      description: '',
      date_deadline: null,
      time_deadline: null,
      gesture: false,
      gestureText: '',
      loading: false
    };
  }

  componentDidMount() {
    const { id, title, priority, description, date_deadline, time_deadline } = this.props.currentTask;
    this.setState({
      id,
      title,
      priority,
      description,
      date_deadline,
      time_deadline
    });
  }

  addTask = () => {
    this.setState({ loading: true }, () => {
      const { id, title, priority, description, date_deadline, time_deadline } = this.state;
      const realID = id ? id : makeID();
      this.props.setTask(1, "tuta", {
        id: realID,
        title,
        priority,
        date_created: new Date().toJSON().slice(0,10),
        date_deadline: CommonFunctions.createDateFormat(date_deadline),
        time_deadline: CommonFunctions.createTimeFormat(time_deadline),
        description
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

  handleDateChange = (e, date_deadline) => {
    this.setState({ date_deadline });
  };

  handleTimeChange = (e, time_deadline) => {
    this.setState({ time_deadline });
  }

  handlePriorityChange = (e, value) => {
    this.setState({ priority: value });
  }

  render() {
    const { loading, gesture, gestureText, title, priority, description, date_deadline, time_deadline } = this.state;
    const styles = {
      largeIcon: {
        width: 50,
        height: 50,
        color: '#031b42'
      }
    };
    return (
      <div className="container container-fluid blue-font">

        <MuiThemeProvider>
          <div>
            {loading ? <div className="center">
              <CircularProgress size={150} thickness={10} />
                </div>:<span />}
            <Snackbar open={gesture} message={gestureText}
              autoHideDuration={4000} onRequestClose={this.handleRequestClose} />

            <div onClick={this.handleCancelClick}>
              <BackIcon style={styles.largeIcon} className="pull-left icon back-icon" />
              <h1 className="pull-left">Set Task</h1>
            </div>
            <br /><br /><br />

            <TextField floatingLabelText="Title" multiLine={true} fullWidth={true}
              rows={2} value={title} name="title" onChange={this.handleChange}
            />

            <Slider min={1} max={5} step={1}
              value={priority}
              onChange={this.handlePriorityChange} />
            <h4>{priority}</h4>

            <TextField floatingLabelText="Description" multiLine={true} fullWidth={true}
              rows={3} value={description} name="description" onChange={this.handleChange}
            />

            <DatePicker hintText="Dead Line Date"
              fullWidth={true}
              value={date_deadline}
              onChange={this.handleDateChange} />

            <TimePicker
              fullWidth={true}
              format="24hr"
              value={time_deadline}
              onChange={this.handleTimeChange}
              hintText="Dead Line Hour"
            />
            <br/>
            <button className="btn btn-success save-button" onClick={this.addTask}>Save</button>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentTask: state.currentTask
  };
}

export default connect(mapStateToProps, { setTask })(AddTask);
