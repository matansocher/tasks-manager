import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NoMatch extends Component {
  render() {
    return(
      <div className="container container-fluid">
        <h1>Oops, something went wrong</h1>
        <ul className="list-group">
          <li className="list-group-item list-group-item-info"><Link to="/">Tasks List</Link></li>
        </ul>
      </div>
    );
  }
}
