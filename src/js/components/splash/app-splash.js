/** @jsx React.DOM */

var React = require('react');
var Link = require('react-router-component').Link;

var Splash = React.createClass({
  record: function(){
    console.log('recorded');
  },
  render: function(){
    return (
        <div className="jumbotron">
            <h1>Splash</h1>
        </div>
      );
  }
});

module.exports = Splash;