import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveCurrentTask } from '../actions';
import * as CommonFunctions from '../actions/CommonFunctions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import DoneIcon from 'material-ui/svg-icons/action/check-circle';
import AssignmentIcon from 'material-ui/svg-icons/action/assignment';
import LessIcon from 'material-ui/svg-icons/navigation/expand-less';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import Delete from 'material-ui/svg-icons/action/delete';

class Task extends Component {
  constructor(props) {
    super(props);
    const { title, description, date_created, date_deadline, time_deadline, priority } = props.task;
    this.state = {
      task: props.task,
      title,
      description,
      date_created,
      date_deadline,
      time_deadline,
      priority,
      detailed: false,
      completed: props.completed
    };
  }

  componentDidMount() {
    const color = CommonFunctions.getBackgroundColor(this.state.task.priority);
    this.styles = {
      bgcolor: {
        backgroundColor: color
      }
    };
  }

  handleEditClick = () => {
    const { task, title, description, date_created, date_deadline, time_deadline, priority } = this.state;
    this.props.saveCurrentTask({
      id: !task.id ? '' : task.id,
      title: !title ? '' : title,
      priority: !priority ? 3 : priority,
      date_created: CommonFunctions.convertDateStringToObject(date_created),
      date_deadline:  CommonFunctions.convertDateStringToObject(date_deadline),
      time_deadline:  CommonFunctions.convertTimeStringToObject(time_deadline),
      description: !description ? '' : description
    });
  }

  editTask = () => {
    const { id } = this.state.task;
    let { title, description, date_deadline, priority } = this.state;
    const date_created = new Date().toJSON().slice(0,10);

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

  handleDateChange = (e, date_deadline) => {
    this.setState({ date_deadline });
  };

  handlePriorityChange = (e, value) => {
    this.setState({ priority: value });
  }

  render() {
    const { detailed, completed } = this.state;
    let { title, priority, description, date_created, date_deadline, time_deadline } = this.state.task;
    date_created = CommonFunctions.createDateFormatToPresent(date_created);
    date_deadline = CommonFunctions.createDateFormatToPresent(date_deadline);
    time_deadline = CommonFunctions.createTimeFormatToPresent(time_deadline);
    const styles = {
      bgcolor: { backgroundColor: CommonFunctions.getBackgroundColor(priority) }
    };
    return (
      <li className="col-sm-12 col-md-12 list-group-item" style={styles.bgcolor}>
        <MuiThemeProvider>
          <div className="task">
            <IconMenu className="three-dots"
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
               { completed ?
                 <MenuItem primaryText="Return To Tasks" leftIcon={<AssignmentIcon />}
                    onClick={this.handleMarkAsNotCompleted} />
                 :
                 <div>
                   <Link to="/AddTask"><MenuItem primaryText="Edit" leftIcon={<EditIcon />}
                      onClick={this.handleEditClick} /></Link>
                   <MenuItem primaryText="Completed" leftIcon={<DoneIcon />}
                      onClick={this.handleMarkAsCompleted} />
                 </div>
               }
               <MenuItem primaryText="Remove" leftIcon={<Delete />}
                  onClick={this.handleDeleteClick} />
            </IconMenu>

            <div onClick={this.handleClickToToggleDetailed}>
              <h3>{title}</h3>
              { detailed ?
                <div>
                  <p>{description}</p>
                  <span>Last Updated: {date_created}</span> <br />
                  <span>Deadline Date: {date_deadline}</span> <br />
                  <span>Deadline Time: {time_deadline}</span>
                  <br />
                  <div className="center more-less">
                    <LessIcon className="icon" />
                  </div>
                </div>
                :
                <div>
                  <span className="show-more">show more...</span>
                </div>
              }
            </div>
          </div>
        </MuiThemeProvider>
      </li>
    )
  }
}

export default connect(null, { saveCurrentTask })(Task);
