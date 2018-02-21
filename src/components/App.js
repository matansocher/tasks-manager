import React, { Component } from 'react';
import AddTask from './AddTask';
import TasksList from './TasksList';
import NoMatch from './NoMatch';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ViewListIcon from 'material-ui/svg-icons/action/view-list';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
// import ContentLink from 'material-ui/svg-icons/content/link';
import Divider from 'material-ui/Divider';
import ContentCopy from 'material-ui/svg-icons/content/low-priority';
import Download from 'material-ui/svg-icons/file/file-download';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
// import Delete from 'material-ui/svg-icons/action/delete';
// import FontIcon from 'material-ui/FontIcon';

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

  changeRoute = (e) => {
    console.log(e);
    console.log('haha');
    console.log(this.props);
    // this.props.history.push('/Settings');
  }

  render() {
    return (
      <Router>
        <div>
          <MuiThemeProvider>
            <div>
              <AppBar className="app-bar" title="Sal-Cal"
                iconClassNameRight="muidocs-icon-navigation-expand-more"
                onClick={this.handleToggle}
              />
              <Drawer width={200} docked={false} open={this.state.open} onRequestChange={this.closeDrawer}>
                <AppBar className="app-bar" title="Sal-Cal" />
                <p className="app-bar">aaaaaaa</p>
                <Paper>
                  <Menu>
                    <MenuItem onClick={this.changeRoute} primaryText="Tasks List" leftIcon={<ViewListIcon />} />
                    <MenuItem onClick={this.changeRoute} primaryText="Settings" leftIcon={<SettingsIcon />} />
                    <Divider />
                    <MenuItem primaryText="Contact Us" leftIcon={<ContentCopy />} />
                    <MenuItem primaryText="About Us" leftIcon={<Download />} />
                  </Menu>
                </Paper>
              </Drawer>
            </div>
          </MuiThemeProvider>

          <hr/>
          <Switch>
            <Route path="/" component={TasksList}/>
            <Route path="*" component={NoMatch}/>
          </Switch>

        </div>
      </Router>
    );
  }
}

export default App;
