import React, { Component } from 'react';
import { getBackgroundColor } from '../actions/CommonFunctions'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Delete from 'material-ui/svg-icons/action/delete';
import MoneyIcon from 'material-ui/svg-icons/editor/attach-money';
import TimeIcon from 'material-ui/svg-icons/device/access-time';

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: props.task
    };
  }

  handleDeleteClick = () => {
    this.props.deleteTask(this.props.task);
  }

  render() {
    const { title, priority, more, date } = this.state.task;
    const color = getBackgroundColor(priority);
    const styles = {
      bgcolor: {
        backgroundColor: color
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
              <MenuItem primaryText="Remove" leftIcon={<Delete />}
                 onClick={this.handleDeleteClick} />
               <MenuItem primaryText="Completed" leftIcon={<Delete />}
                  onClick={this.handssssssssssssssleDeleteClick} />
            </IconMenu>

            <FloatingActionButton backgroundColor={color}>
              {priority}
            </FloatingActionButton> <br />

            <h2 className="task-description">{title}</h2> <br />
            <p className="task-description">more: {more}</p> <br />
            <span className="task-description">Priority: {priority}</span> <br />
            <span className="task-description">Date Added: {date}</span> <br />
          </div>
        </MuiThemeProvider>
      </li>
    )
  }
}
