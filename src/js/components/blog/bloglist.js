/** @jsx React.DOM */

var React = require('react');
var BlogList = React.createClass({
  render: function(){
    var data = this.props.data; //TODO: loop through array, make each line.
    return <h1>{data}</h1>;
  }
});

module.exports = BlogList;