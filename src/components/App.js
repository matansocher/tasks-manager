import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { getMainColor } from '../actions/CommonFunctions';
import AddTask from './AddTask';
import TasksList from './TasksList';
import CompletedList from './CompletedList';
import NoMatch from './NoMatch';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ViewListIcon from 'material-ui/svg-icons/action/view-list';
import DoneIcon from 'material-ui/svg-icons/action/check-circle';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import Divider from 'material-ui/Divider';
import ContentCopy from 'material-ui/svg-icons/content/low-priority';
import Download from 'material-ui/svg-icons/file/file-download';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  closeDrawer = () => {
    this.setState({ open: false });
  }

  handleToggle = () => {
    this.setState({ open: !this.state.open });
  }

  closeDrawer = (e) => {
    this.setState({ open: false });
  }

  render() {
    const mainColor = getMainColor();
    return (
      <Router>
        <div>
          <MuiThemeProvider>
            <div>
              <AppBar className="app-bar" title="Tasks-Manager"
                iconClassNameRight="muidocs-icon-navigation-expand-more"
                onClick={this.handleToggle}
                style={{backgroundColor: mainColor, position: 'fixed', top: 0}}
              />
              <Drawer width={300} docked={false} open={this.state.open} onRequestChange={this.closeDrawer}>
                <AppBar className="app-bar" style={{backgroundColor: mainColor}} title="Tasks-Manager" />
                <Paper>
                  <Menu>
                    <Link to="/"><MenuItem onClick={this.closeDrawer} primaryText="Tasks List" leftIcon={<ViewListIcon />} /></ Link>
                    <Link to="/Completed"><MenuItem onClick={this.closeDrawer} primaryText="Completed Tasks" leftIcon={<DoneIcon />} /></ Link>
                    <MenuItem onClick={this.closeDrawer} primaryText="Settings" leftIcon={<SettingsIcon />} />
                    <Divider />
                    <MenuItem primaryText="Contact Us" leftIcon={<ContentCopy />} />
                    <MenuItem primaryText="About Us" leftIcon={<Download />} />
                  </Menu>
                </Paper>
              </Drawer>
            </div>
          </MuiThemeProvider>
          <br />
          <hr/>
          <Switch>
            <Route path="/AddTask" component={AddTask}/>
            <Route path="/Completed" component={CompletedList}/>
            <Route path="/" component={TasksList}/>
            <Route path="*" component={NoMatch}/>
          </Switch>

        </div>
      </Router>
    );
  }
}

export default App;
