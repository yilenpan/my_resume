/** @jsx React.DOM */

var React = require('react');
var Bio = React.createClass({
  render: function(){
    var data = this.props.data;
    return <h1>{data.name}</h1>;
  }
});

module.exports = Bio;