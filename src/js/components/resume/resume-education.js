/** @jsx React.DOM */

var React = require('react');
var Projects = React.createClass({
  render: function(){
    var data = this.props.data;
    return <p>{data}</p>;
  }
});

module.exports = Projects;