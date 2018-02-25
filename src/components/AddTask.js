import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTask } from '../actions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import Slider from 'material-ui/Slider';
import Snackbar from 'material-ui/Snackbar';
import DatePicker from 'material-ui/DatePicker';
import BackIcon from 'material-ui/svg-icons/navigation/chevron-left';
import SaveIcon from 'material-ui/svg-icons/action/done';


class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      priority: 3,
      description: '',
      date_deadline: '', // new Date().toJSON().slice(0,10)
      gesture: false,
      gestureText: '',
      loading: false
    };
  }

  componentDidMount() {
    // console.log('mounted');
  }

  makeID = () => {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 20; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  addTask = () => {
    this.setState({ loading: true }, () => {
      const { title, priority, description, date_deadline } = this.state;
      const id = this.makeID();
      // const id = Math.floor((Math.random() * 100000) + 1);
      const date_created = new Date().toJSON().slice(0,10);
      this.props.addTask("tuta", {
        id,
        title,
        priority,
        date_created,
        date_deadline,
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

  handleDateChange = (e, date) => {
    this.setState({ date_deadline: date });
  };

  handlePriorityChange = (e, value) => {
    this.setState({ priority: value });
  }

  render() {
    const { loading, gesture, gestureText, title, priority, description, date_deadline } = this.state;
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
        <MuiThemeProvider>
          <div>
            {loading ? <CircularProgress size={80} thickness={8} /> : <span />}
            <Snackbar open={gesture} message={gestureText}
              autoHideDuration={4000} onRequestClose={this.handleRequestClose} />

            <BackIcon style={styles.largeIcon} className="pull-left icon" onClick={this.handleCancelClick} />
            <SaveIcon style={styles.largeIcon} className="pull-right icon" onClick={this.addTask} />

            <br /><br />

            <textarea className="form-control" ref="title" name="title"
              placeholder="Title"
              value={title} onChange={this.handleChange} />

            <Slider min={1} max={5} step={1}
              value={priority}
              onChange={this.handlePriorityChange} />
            <h4>{priority}</h4>

            <textarea className="form-control" ref="description" name="description"
              placeholder="Description"
              value={description} onChange={this.handleChange} />

            <DatePicker hintText="Dead Line Date"
              value={date_deadline}
              onChange={this.handleDateChange} />

          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default connect(null, { addTask })(AddTask);
