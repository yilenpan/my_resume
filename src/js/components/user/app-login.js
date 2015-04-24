/** @jsx React.DOM */

var React = require('react');
var Link = require('react-router-component').Link;

//need to check if registered

var Login = React.createClass({
  record: function(){
    console.log('recorded');
  },
  render: function(){
    return (
        <div className="jumbotron">
            <h1>Login</h1>
        </div>
      );
  }
});

module.exports = Login;