/** @jsx React.DOM */

var React = require('react');
var Link = require('react-router-component').Link;
var Header = React.createClass({
  render: function(){
    return (
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="/">YiPz</a>
            </div>
          </div>
        </nav>
      );
  }
});

module.exports = Header;