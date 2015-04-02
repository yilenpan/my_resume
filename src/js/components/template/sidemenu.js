/** @jsx React.DOM */

var React = require('react');
var Link = require('react-router-component').Link;

var SideMenu = React.createClass({
  render: function(){
    return (
      <div className="col-xs-3">
        <h1> Yilen Pan </h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus amet recusandae quos obcaecati. Id quod, dignissimos, ratione facilis culpa soluta rem rerum minus sit possimus dolor earum placeat voluptates officiis.</p>
      </div>
      );
  }
});

module.exports = SideMenu;