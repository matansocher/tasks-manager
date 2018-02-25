import React, { Component } from 'react';
import { getBackgroundColor } from '../actions/CommonFunctions'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Slider from 'material-ui/Slider';
import DatePicker from 'material-ui/DatePicker';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import DoneIcon from 'material-ui/svg-icons/action/check-circle';
import AssignmentIcon from 'material-ui/svg-icons/action/assignment';
import MoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import LessIcon from 'material-ui/svg-icons/navigation/expand-less';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import SaveIcon from 'material-ui/svg-icons/action/done';
import Delete from 'material-ui/svg-icons/action/delete';

export default class Task extends Component {
  constructor(props) {
    super(props);
    const { title, description, date_created, date_deadline, priority } = props.task;
    this.state = {
      task: props.task,
      title,
      description,
      date_created,
      date_deadline,
      priority,
      editing: false,
      detailed: false,
      completed: props.completed
    };
  }

  componentDidMount() {
    const color = getBackgroundColor(this.state.task.priority);
    this.styles = {
      bgcolor: {
        backgroundColor: color
      }
    };
  }

  handleEditClick = () => {
    this.setState({ editing: true });
  }

  handleCnacelEditClick = () => {
    this.setState({ editing: false });
  }

  editTask = () => {
    const { id } = this.state.task;
    const { title, description, date_created, date_deadline, priority } = this.state;
    const task = {
      id,
      title,
      description,
      date_created,
      date_deadline,
      priority
    };
    this.props.editTask(task);
  }

  handleDeleteClick = () => {
    this.props.deleteTask(this.props.task);
  }

  handleMarkAsCompleted = () => {
    this.props.completedOrReturn(this.props.task, 1);
  }

  handleMarkAsNotCompleted = () => {
    this.props.completedOrReturn(this.props.task, 2);
  }

  handleClickToToggleDetailed = () => {
    this.setState({ detailed: !this.state.detailed });
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

  renderRegular() {
    const { detailed, completed } = this.state;
    const { title, priority, description, date_created, date_deadline } = this.state.task;
    const styles = {
      bgcolor: {
        backgroundColor: getBackgroundColor(priority)
      }
    };
    return (
      <li className="col-sm-12 col-md-12 list-group-item" style={styles.bgcolor}>
        <MuiThemeProvider>
          <div>
            <IconMenu className="pull-right"
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
               { completed ?
                 <MenuItem primaryText="Return To Tasks" leftIcon={<AssignmentIcon />}
                    onClick={this.handleMarkAsNotCompleted} />
                 :
                 <MenuItem primaryText="Edit" leftIcon={<EditIcon />}
                    onClick={this.handleEditClick} />
                 <MenuItem primaryText="Completed" leftIcon={<DoneIcon />}
                    onClick={this.handleMarkAsCompleted} />
               }
               <MenuItem primaryText="Remove" leftIcon={<Delete />}
                  onClick={this.handleDeleteClick} />
            </IconMenu>

            <h3>{title}</h3>
            { detailed ?
              <div>
                <p>{description}</p>
                <span>Date Created: {date_created}</span> <br />
                <span>Deadline Date: </span>
                { date_deadline === new Date().toJSON().slice(0,10) ?
                  {"Today"}
                  :
                  {date_deadline}
                }<br />
                <LessIcon onClick={this.handleClickToToggleDetailed} />
              </div>
              :
              <div className="center-icon">
                <MoreIcon onClick={this.handleClickToToggleDetailed} />
              </div>
            }

          </div>
        </MuiThemeProvider>
      </li>
    )
  }

  renderEdit() {
    const { title, priority, description, date_deadline } = this.state;
    const styles = {
      bgcolor: {
        backgroundColor: getBackgroundColor(priority)
      }
    };
    return (
      <li className="col-sm-12 col-md-12 list-group-item">
        <MuiThemeProvider>
          <div>

            <ClearIcon style={styles.largeIcon} className="pull-left icon" onClick={this.handleCnacelEditClick} />
            <SaveIcon style={styles.largeIcon} className="pull-right" onClick={this.editTask} />

            <br /><br />

            <h3>Title:</h3>
            <textarea className="form-control" ref="title" name="title"
              placeholder="Title"
              value={title} onChange={this.handleChange} />

            <h3>Priority: {priority}</h3>
            <Slider min={1} max={5} step={1}
              value={priority}
              onChange={this.handlePriorityChange} />

            <h3>Description:</h3>
            <textarea className="form-control" ref="description" name="description"
              placeholder="Description"
              value={description} onChange={this.handleChange} />

            <h3>Dead Line:</h3>
            <DatePicker hintText="Dead Line"
            value={date_deadline}
            onChange={this.handleDateChange} />

          </div>
        </MuiThemeProvider>
      </li>
    )
  }

  render() {
    if(this.state.editing) {
      return this.renderEdit();
    }
    else {
      return this.renderRegular();
    }
  }
}
