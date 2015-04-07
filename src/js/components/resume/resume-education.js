/** @jsx React.DOM */

var React = require('react');
var Education = React.createClass({
  render: function(){
    var data = this.props.data;
    return <p>{data}</p>;
  }
});

module.exports = Education;