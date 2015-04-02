/** @jsx React.DOM */

var React = require('react'),
    ResumeData = require('../../stores/app-resume.js');

var Resume = React.createClass({
  getInitialState: function(){
    return {data: ResumeData};
  },
  render: function(){
    return (<div>
              <h1>Resume</h1>
              <p>{this.state.data}</p>
            </div>);
  }
});

module.exports = Resume;