/** @jsx React.DOM */

var React = require('react');
var Projects = React.createClass({
  render: function(){
    var data = this.props.data;
    return <h1>{data[0].title}</h1>;
  }
});

module.exports = Projects;