/** @jsx React.DOM */

var React = require('react');
var Education = React.createClass({
  render: function(){
    var schools = this.props.data.schools;
    var onlineCourses = this.props.data.onlineCourses;
    return (<div className="col-xs-12"><p>{schools}</p></div>);
  }
});

module.exports = Education;